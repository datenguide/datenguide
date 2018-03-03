---
title: Open Canvas
layout: canvas
permalink: /open_canvas/
---
<div class="container">
{% for section in site.canvas %}
  <section class="{{ section.class }}">
    <header><a href="{{ section.url }}">{{ section.title }}</a></header>
    <ul>
    {% for item in section.item %}
     <li>{{ item }}</li>
     {% endfor %}
    </ul>
  </section>
{% endfor %}
</div>
<div class="grid_footer">
  <div class="left">Product</div>
  <div class="right">Community</div>
</div>
