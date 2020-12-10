let title = draft.processTemplate("[[title]]");
let content = draft.processTemplate("%%[[body]]%%");
let date = draft.processTemplate("[[modified]]");
let snippet = draft.bodyPreview(140);

var http = HTTP.create(); // create HTTP object
var response = http.request({
  "url": "https://api.cosmicjs.com/v1/your_cosmic_slug/add-object", // Add your Cosmic slug, you can find it in your user settings
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