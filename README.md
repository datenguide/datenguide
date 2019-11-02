Datenguide is your guide to understanding and using German official statistics. We work on an easy-to-use data portal and on learning materials around data published by the German statistics offices.

### Mission statement (draft)

> We are working with journalists and public administrators in Germany to make official statistics more accessible to citizens so that they can use publicly available statistical data to gain an informed understanding of social, economic, and environmental issues in their region.
>
> We are working in the open to make our activities transparent and enable others to contribute. We use open licenses to make it easy to build upon and reuse our work.

### Where's the code?

Datenguide consists of several components:

- The repository you are currently looking at, which has the source code for the [datengui.de](https://datengui.de) web site.
- The [datenguide-api](https://github.com/datenguide/datenguide-api) project, which provides a [GraphQL API](https://graphql.org/) for accessing German public statistics.
- The Genesapi project, which provides [tools for importing statistical data](https://github.com/datenguide/genesapi-cli) from where they are officially published, and [exporting them as CSV and JSON](https://github.com/datenguide/genesapi-tabular).

### Background: Official statistics in Germany

Official statistics are statistics published by government agencies and other public bodies, usually about economic, environmental, and societal topics. Official statistics are commonly used by policy makers and public administrators but are also an important tool for journalists and civil society initiatives.

In Germany, official statistics are collected, processed, analyzed, and published by the federal statistics office ([DESTATIS](https://en.wikipedia.org/wiki/Federal_Statistical_Office_of_Germany)), and the 14 [statistical offices of the German states](https://en.wikipedia.org/wiki/List_of_statistical_offices_in_Germany). The German statistics offices publish their data on several data portals, e.g.

- [Genesis Online](https://www-genesis.destatis.de/genesis/online/) (the main "Genesis" instance, the official DESTATIS data portal)
- [Regionalstatistik.de](https://www.regionalstatistik.de/genesis/online/) (another "Genesis" instance, with a focus on local and regional data)

The problem with the official data portals is that they are expert systems, made by and for bureaucrats. While these data portals get the job done for people who know what they are doing, they are hardly usable for less tech- and data-savy people. Also, none of the data portals provide modern, easy-to-use APIs or machine-readable data formats, which makes it hard to use the data in your own work.

This is where Datenguide comes in. We are working on a modern, easy-to-use data portal aimed at regular people. A website that allows for exploratory browsing, provides explanations and context about the statistics, and lets you download data sets in formats that you can readily use in your own projects.

### Contributing

We are actively seeking contributors for this project – civic technologists, designers, developers, researchers, and data journalists. If you want to help making official statistics more usable, get in touch! ([email](mailto:sj@datengui.de) / [twitter](https://twitter.de/datenguide))

Ways to support the Datenguide project:

- Contribute to the [datengui.de web application](https://github.com/datenguide/datenguide) and [GraphQL API](https://github.com/datenguide/datenguide) (JavaScript)
- Help us improve our [data import pipeline](https://github.com/datenguide/genesapi-cli) and [data export API](https://github.com/datenguide/genesapi-tabular) (Python)
- Help with organizing a workshop or hackathon around open data and official statistics
- Write documentation, tutorials, or blog posts

Datenguide is still in early stages and is bound to change heavily over the next couple of weeks. For bugs and feature requests, please [create an issue](https://github.com/datenguide/datenguide/issues/new). When contributing to the Datenguide project, please observe our [code of conduct](https://github.com/datenguide/datenguide/blob/master/CODE_OF_CONDUCT).

### License

Datenguide is an open data project built on open source software. The Datenguide source code is published under a [MIT License](https://github.com/datenguide/datenguide/blob/master/LICENSE). The documentation in this repository is published under a [Creative Commons Attribution 4.0 International License (CC By 4.0)](https://creativecommons.org/licenses/by/4.0/). The official statistics used in the Datenguide project are licensed under [Data Licence Germany – Attribution – Version 2.0 (dl-de/by-2-0)](https://www.govdata.de/en/dl-de/by-2-0), the official German open data license, by the [statistical offices of Germany](https://www.regionalstatistik.de/). The image assets that are contained in this repository are courtesy of their respective rights holders and not covered by open licenses.

### Supporters & funders

Datenguide received funding from [MIZ Babelsberg](https://miz-babelsberg.de) and the [Prototype Fund](https://prototypefund.de), a funding program by Open Knowledge Germany and the German Federal Ministry of Education and Research.

In 2018, Datenguide participated in the [Mozilla Open Leaders](https://foundation.mozilla.org/en/opportunity/mozilla-open-leaders/) program and received support through a [stipend](https://netzwerkrecherche.org/ziele/gemeinnuetziger-journalismus/grow-stipendien/) from Netzwerk Recherche and the Schöpflin Foundation.

The open canvas, which can be found in this repo's [`docs`](https://github.com/datenguide/datenguide/blob/master/docs/) folder is built using the Jekyll static site generator. It uses a project structure borrowed from [deimidis/privacy-journalists](https://github.com/deimidis/privacy-journalists), a collection of privacy related tutorials for journalists, published under [Mozilla Public License](https://github.com/datenguide/datenguide/blob/master/docs/LICENSE).
