const searchClient = algoliasearch(
  "B1G2GM9NG0", // APP ID
  "aadef574be1f9252bb48d4ea09b5cfe5" // Search Only API Key
);

const search = instantsearch({
  indexName: "demo_ecommerce",
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
      <img src="${data.image}"/>
        <div>
          <div class="hit-title">
            <h4>${instantsearch.highlight({
              attribute: "name",
              hit: data
            })}</h4>
            <div class="price">$${data.price}</div>
          </div>
        <p>${instantsearch.highlight({
          attribute: "description",
          hit: data
        })}</p>
      </div>
      `,
      empty: "<h1>ヒット無し</h1>"
    }
  })
);

search.addWidget(
  instantsearch.widgets.refinementList({
    container: "#brands",
    attribute: "brand",
    searchable: true,
    searchablePlaceholder: "ブランドで検索"
  })
);

search.addWidget(
  instantsearch.widgets.rangeInput({
    container: "#price",
    attribute: "price"
  })
);
