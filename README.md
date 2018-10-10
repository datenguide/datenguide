Datenguide is your guide to understanding and using German official statistics. We work on an easy-to-use data portal and on learning materials around data published by the German statistics offices. Datenguide is in early stages and is bound to change heavily over the next couple of weeks. See the [roadmap](https://github.com/datenguide/datenguide/issues/1) for details.

### Mission statement (draft)

> We are working with journalists and public administrators in Germany to make official statistics more accessible to citizens so that they can use publicly available statistical data to gain an informed understanding of social, economic, and environmental issues in their region.
>
> We are working in the open to make our activities transparent and enable others to contribute. We use open licenses to make it easy to build upon and reuse our work.

### Where's the code?

Datenguide consists of two main components:

- [datenguide-backend](https://github.com/datenguide/datenguide-backend), which collects data sets from where they are officially published and provides a [GraphQL API](https://graphql.org/) for accessing them
- [datenguide-frontend](https://github.com/datenguide/datenguide-frontend), which has everything that's needed for generating a website based on that data

### Background: Official statistics in Germany

Official statistics are statistics published by government agencies and other public bodies, usually about economic, environmental, and societal topics. Official statistics are commonly used by policy makers and public administrators but are also an important tool for journalists and civil society initiatives.

In Germany, official statistics are collected, processed, analyzed, and published by the federal statistics office ([DESTATIS](https://en.wikipedia.org/wiki/Federal_Statistical_Office_of_Germany)), and the 14 [statistical offices of the German states](https://en.wikipedia.org/wiki/List_of_statistical_offices_in_Germany). The German statistics offices publish their data on several data portals, e.g.

- [GovData.de](https://www.govdata.de/) (the official German open data portal)
- [Genesis Online](https://www-genesis.destatis.de/genesis/online/) (the main "Genesis" instance, the official DESTATIS data portal)
- [Regionalstatistik.de](https://www.regionalstatistik.de/genesis/online/) (another "Genesis" instance, with a focus on local and regional data)

The problem with the official data portals is that they are expert systems, made by and for bureaucrats. While these data portals get the job done for people who know what they are doing, they are hardly usable for less tech- and data-savy people. Also, none of the data portals provide modern, easy-to-use APIs or machine-readable data formats, which makes it hard to use the data in your own work.

This is where Datenguide comes in. We are working on a modern, easy-to-use data portal aimed at regular people. A website that allows for exploratory browsing, provides explanations and context about the statistics, and lets you download data sets in formats that you can readily use in your own projects.

### More about this project

Datenguide participates in the [Mozilla Open Leaders](https://foundation.mozilla.org/en/opportunity/mozilla-open-leaders/) program. See our [open canvas](https://datenguide.github.io/datenguide/open_canvas/) for background information on the project.

The open canvas, which can be found in this repo's [`docs`](https://github.com/datenguide/datenguide/blob/master/docs/) folder is built using the Jekyll static site generator. It uses a project structure borrowed from [deimidis/privacy-journalists](https://github.com/deimidis/privacy-journalists), a collection of privacy related tutorials for journalists, published under [Mozilla Public License](https://github.com/datenguide/datenguide/blob/master/docs/LICENSE).
