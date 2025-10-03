# Datenguide

[![Build Status](https://travis-ci.com/datenguide/datenguide.svg?branch=main)](https://travis-ci.com/datenguide/datenguide)

Datenguide is your guide to understanding and using German official statistics. We work on an easy-to-use data portal and on learning materials around data published by the German statistics offices.

## Mission statement

> We are working with journalists and public administrators in Germany to make official statistics more accessible to citizens so that they can use publicly available statistical data to gain an informed understanding of social, economic, and environmental issues in their region.
>
> We are working in the open to make our activities transparent and enable others to contribute. We use open licenses to make it easy to build upon and reuse our work.

## Where's the code?

Datenguide consists of several components:

- The repository you are currently looking at, which has the source code for the [datengui.de](https://datengui.de) web site.
- The [datenguide-api](https://github.com/datenguide/datenguide-api) project, which provides a [GraphQL API](https://graphql.org/) for accessing German public statistics.
- The Genesapi project, which provides [tools for importing statistical data](https://github.com/datenguide/genesapi-cli) from where they are officially published, and [exporting them as CSV and JSON](https://github.com/datenguide/genesapi-tabular).

## Background: Official statistics in Germany

Official statistics are statistics published by government agencies and other public bodies, usually about economic, environmental, and societal topics. Official statistics are commonly used by policy makers and public administrators but are also an important tool for journalists and civil society initiatives.

In Germany, official statistics are collected, processed, analyzed, and published by the federal statistics office ([DESTATIS](https://en.wikipedia.org/wiki/Federal_Statistical_Office_of_Germany)), and the 14 [statistical offices of the German states](https://en.wikipedia.org/wiki/List_of_statistical_offices_in_Germany). The German statistics offices publish their data on several data portals, e.g.

- [Genesis Online](https://www-genesis.destatis.de/genesis/online/) (the main "Genesis" instance, the official DESTATIS data portal)
- [Regionalstatistik.de](https://www.regionalstatistik.de/genesis/online/) (another "Genesis" instance, with a focus on local and regional data)

The problem with the official data portals is that they are expert systems, made by and for bureaucrats. While these data portals get the job done for people who know what they are doing, they are hardly usable for less tech- and data-savy people.

This is where Datenguide comes in. We are working on a modern, easy-to-use data portal aimed at regular people. A website that allows for exploratory browsing, provides explanations and context about the statistics, and lets you download data sets in formats that you can readily use in your own projects.

## Contributing

We are actively seeking contributors for this project – civic technologists, designers, developers, researchers, and data journalists. If you want to help making official statistics more usable, get in touch! ([email](mailto:community@datengui.de) / [twitter](https://twitter.de/datenguide))

**How you can help:**

- Contribute to the [datengui.de](https://datengui.de) web application, which lives in this very repo, and the [GraphQL API](https://github.com/datenguide/datenguide-api) (JavaScript)
- Help us improve our [data import CLI](https://github.com/datenguide/genesapi-cli) and [data export API](https://github.com/datenguide/genesapi-tabular) (Python)
- Help with organizing a workshop or hackathon around open data and official statistics
- Write documentation, tutorials, or blog posts

Have a look at our [project board](https://github.com/orgs/datenguide/projects/1) to learn about the tasks we currently work on.

## Contributing

For bugs and feature requests, please [create an issue](https://github.com/datenguide/datenguide/issues/new). We follow the Datenguide [code of conduct](https://github.com/datenguide/datenguide/blob/main/CODE_OF_CONDUCT).

## Installing and running Datenguide

The [datengui.de](https://datengui.de) web application is built on top of [NextJS](https://nextjs.org/docs) and [React](https://reactjs.org/). It uses Yarn [Yarn](https://yarnpkg.com/) for mamaging dependencies.

**Getting started:**

- Make sure you have [NodeJS](https://nodejs.org/) and [Yarn](https://yarnpkg.com/getting-started) installed on your machine.
- Clone this repo
- Create a .env file in the root of the project directory. Duplicating .env.sample is sufficient for most use cases: `cp .env.sample .env`
- Install dependencies: `yarn install`
- Run in development mode: `yarn dev`

## License

Datenguide is an open data project built on open source software. The Datenguide source code is published under a [MIT License](https://github.com/datenguide/datenguide/blob/main/LICENSE). The documentation in this repository is published under a [Creative Commons Attribution 4.0 International License (CC By 4.0)](https://creativecommons.org/licenses/by/4.0/). The official statistics used in the Datenguide project are licensed under [Data Licence Germany – Attribution – Version 2.0 (dl-de/by-2-0)](https://www.govdata.de/en/dl-de/by-2-0), the official German open data license, by the [statistical offices of Germany](https://www.regionalstatistik.de/). The image assets that are contained in this repository are courtesy of their respective rights holders and not covered by open licenses.

## Supporters & funders

Datenguide received funding from [MIZ Babelsberg](https://miz-babelsberg.de) and the [Prototype Fund](https://prototypefund.de), a funding program by Open Knowledge Germany and the German Federal Ministry of Education and Research.

In 2018, Datenguide participated in the [Mozilla Open Leaders](https://foundation.mozilla.org/en/opportunity/mozilla-open-leaders/) program and received support through a [stipend](https://netzwerkrecherche.org/ziele/gemeinnuetziger-journalismus/grow-stipendien/) from Netzwerk Recherche and the Schöpflin Foundation.
