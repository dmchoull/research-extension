import cheerio from "cheerio";
import ResultData from "../../common/resultData";

interface YoutubeSearchResult {
  videoRenderer?: {
    videoId: string;
    title: {
      simpleText: string;
    };
    thumbnail: {
      thumbnails: { url: string }[];
    };
    viewCountText: {
      simpleText: string;
    };
    lengthText: {
      simpleText: string;
    };
  };
}

function buildResult({ videoRenderer }: YoutubeSearchResult): ResultData | null {
  if (!videoRenderer) {
    return null;
  }

  return {
    id: videoRenderer.videoId,
    title: videoRenderer.title.simpleText,
    thumbnail: videoRenderer.thumbnail.thumbnails[0],
    viewCount: videoRenderer.viewCountText.simpleText,
    length: videoRenderer.lengthText.simpleText,
  };
}

function searchYoutube(query: string): Promise<ResultData[]> {
  return new Promise(resolve => {
    fetch(`https://www.youtube.com/results?search_query=${query}`).then(res => {
      res.text().then(html => {
        const $ = cheerio.load(html);

        const scriptTags = $("script");
        let results: ResultData[] = [];

        scriptTags.each((index, script) => {
          const scriptContent = script.children[0] && script.children[0].data;

          if (!scriptContent || !scriptContent.includes('window["ytInitialData"]')) {
            return;
          }

          const body = scriptContent.replace('window["ytInitialData"] =', "return");
          const { contents } = new Function(body)();

          const searchResults =
            contents.twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer.contents[0].itemSectionRenderer
              .contents;
          const videoResults = searchResults.map((result: YoutubeSearchResult) => buildResult(result)).filter(Boolean);

          results.push(...videoResults);
        });

        resolve(results);
      });
    });
  });
}

export default searchYoutube;
