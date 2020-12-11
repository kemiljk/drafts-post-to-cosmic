# Drafts››Cosmic

![Drafts to Cosmic logo](https://res.cloudinary.com/kejk/image/upload/v1607677073/drafts-to-cosmic_hllch7.svg)

A [Drafts action extension](https://actions.getdrafts.com/a/1fP) written in Javascipt to publish directly from a Draft to a Cosmic bucket of your choice. 

This action preserves the body markdown as HTML so it’s accepted in to Cosmic’s content block as expected. No markup necessary. By default it posts as a “draft”, but I’d recommend changing the `status` line to “published” once you’re comfortable with how it works as it saves a step later.

The extension is well commented so it's clear what elements you should change and some recommended or guiding values you can change it to. It's a flexible file though, feel free to extend it and share updates by opening issues in this repo or forking and submitting a pull request back into Master.

1. Define your Drafts variables (you can see all the available options from their extensive [script reference library](https://scripting.getdrafts.com)

```
let title = draft.processTemplate("[[title]]");
let content = draft.processTemplate("%%[[body]]%%");
let date = draft.processTemplate("[[modified]]");
let snippet = draft.bodyPreview(140);
```

2. Create your API POST request

```
var http = HTTP.create(); // create HTTP object
var response = http.request({
  "url": "https://api.cosmicjs.com/v1/your_cosmic_slug/add-object", // Add your Cosmic slug, you can find it in your user settings
  "method": "POST",
```

3. Then add your data (this should match your previously set variables and should align with what your Cosmic bucket is expecting for consistency. But! Cosmic is clever so if a metafield doesn't exist, Cosmic will create it for you for that object and fill out the value!

```
  "data": {
  "title": title, // default Cosmic data point for the object title
  "content": content, // default Cosmic data point for the body content
  "type_slug": "your_object_slug", // find this in your Object's settings
  "metafields": [ // If these fields don't exist, Cosmic will create the metafields and fill the data for you... awesome
    {
      "key": "value", // e.g. published-date
      "title": "value", // e.g. Published on
      "type": "date",
      "value": date,
    },
    {
      "key": "value", // e.g. snippet
      "title": "value", // e.g. Content snippet
      "type": "text",
      "value": snippet,
    }
  ],
```
4. Finally, set a status type (either draft or published. If you don't set anything here or delete this line then Cosmic will publish it by default. Then set your Cosmic write key to allow you to publish content from outside your Bucket. Get this from Bucket › Settings › Write Key 

```
  "status": "draft", // e.g. "draft" / "published"
  "write_key": "your_cosmic_write_key"
	},
});
```

5. Putting it all together

```
let title = draft.processTemplate("[[title]]");
let content = draft.processTemplate("%%[[body]]%%");
let date = draft.processTemplate("[[modified]]");
let snippet = draft.bodyPreview(140);

var http = HTTP.create(); // create HTTP object
var response = http.request({
  "url": "https://api.cosmicjs.com/v1/your_cosmic_bucket_slug/add-object", // Add your Cosmic Bucket slug, you can find it in your user settings
  "method": "POST",
  "data": {
  "title": title, // default Cosmic data point for the object title
  "content": content, // default Cosmic data point for the body content
  "type_slug": "your_object_slug", // find this in your Object's settings
  "metafields": [ // If these fields don't exist, Cosmic will create the metafields and fill the data for you... awesome
    {
      "key": "value", // e.g. published-date
      "title": "value", // e.g. Published on
      "type": "date",
      "value": date,
    },
    {
      "key": "value", // e.g. snippet
      "title": "value", // e.g. Content snippet
      "type": "text",
      "value": snippet,
    }
  ],
  "status": "draft", // e.g. "draft" / "published"
  "write_key": "your_cosmic_write_key"
	},
});
```
