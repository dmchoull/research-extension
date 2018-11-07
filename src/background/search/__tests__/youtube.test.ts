import searchYoutube from "../youtube";
import fetch from "jest-fetch-mock";

describe("Youtube search", () => {
  afterEach(() => {
    fetch.resetMocks();
  });

  it("fetches the youtube search results page and returns video results", async () => {
    fetch.mockResponse(`
        <html>
          <body>
            <script>
            </script>
            <script>
              window["ytInitialData"] = {
                "responseContext": {},
                "estimatedResults": "37",
                "contents": {
                  "twoColumnSearchResultsRenderer": {
                    "primaryContents": {
                      "sectionListRenderer": {
                        "contents": [
                          {
                            "itemSectionRenderer": {
                              "contents": [
                                {
                                  "videoRenderer": {
                                    "videoId": "CgsWNu38eG0",
                                    "thumbnail": {
                                      "thumbnails": [{
                                        "url": "https://i.ytimg.com/vi/CgsWNu38eG0/hqdefault.jpg?sqp=-oaymwEZCNACELwBSFXyq4qpAwsIARUAAIhCGAFwAQ==\u0026rs=AOn4CLAIMYP-0BlXhCCXTquWAsa1IjMlDw",
                                        "width": 490,
                                        "height": 274,
                                      }], "webThumbnailDetailsExtensionData": { "isPreloaded": true },
                                    },
                                    "title": {
                                      "accessibility": { "accessibilityData": { "label": "SnoBrum Auto Snow Removal Tool by Snow Joe + Sun Joe 2 years ago 44 seconds 5,011 views" } },
                                      "simpleText": "SnoBrum Auto Snow Removal Tool",
                                    },
                                    "descriptionSnippet": {
                                      "runs": [{ "text": "With the " }, {
                                        "text": "SnoBrum",
                                        "bold": true,
                                      }, { "text": ", you can easily push heavy, wet " }, {
                                        "text": "snow",
                                        "bold": true,
                                      }, { "text": " off the roof, hood, and trunk without scratching the paint or harming the ..." }],
                                    },
                                    "lengthText": {
                                      "accessibility": { "accessibilityData": { "label": "44 seconds" } },
                                      "simpleText": "0:44",
                                    },
                                    "viewCountText": { "simpleText": "5,011 views" },
                                  },
                                }],
                            },
                          },
                        ],
                      },
                    },
                  },
                },
              };
            </script>
          </body>
        </html>
    `);

    const results = await searchYoutube("test");

    expect(fetch).toHaveBeenCalledWith("https://www.youtube.com/results?search_query=test");
    expect(results).toHaveLength(1);
  });

  it("returns no results when the data is not present", async () => {
    fetch.mockResponse("<html><body><script></script></body></html>");

    const results = await searchYoutube("test");

    expect(results).toHaveLength(0);
  });
});
