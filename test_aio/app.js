const searchClient = algoliasearch(
  "T8X1RAVLFX", // APP ID
  "db67a376ae3d48c7a9a66be670ff29c1" // Search Only API Key
);

const search = instantsearch({
  indexName: "test_aio",
  searchClient
});

search.addWidget(
  instantsearch.widgets.searchBox({
    container: "#searchbox",
    placeholder: "検索してみましょう"
  })
);

search.start();

search.addWidget(
  instantsearch.widgets.hits({
    container: "#hits",
    templates: {
      item: data => `
        <div>
          <div class="hit-title">
            <h4>${instantsearch.highlight({
              attribute: "original_answer",
              hit: data
            })}</h4>
          </div>
        <p>${instantsearch.highlight({
          attribute: "original_question",
          hit: data
        })}</p>
      </div>
      `,
      empty: "<h1>ヒット無し</h1>"
    }
  })
);
