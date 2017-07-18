Quinoa story document model description
===

## Anatomy of a story

```js
{
  "type": "quinoa-story", // type identification
  "id": <String>, // seft identification
  "metadata": <Object>, // 
  "sectionsOrder": <Array<String>>, // 
  "sections": <Object>, // 
  "resources": <Object>, // 
  "contextualizations": <Object>, // 
  "contextualizers": <Object>, // 
  "settings": <Object> // 
}
```


## Anatomy of metadata

```js
{
  "authors": <Array<String>>, // authors of the data
  "description": <String>, // description to be displayed
  "title": <String> // title to be displayed
  "gistId": <String> // gist id
  "gistUrl": <String> // gist url
  "server url": <String> // server url
}
```


## Anatomy of a section

```js
{
  "id": <String> // self identification
  "contents": <Object>, // draft-js raw state
  "notes": <Object>, // map of notes objects (keys are ids)
  "notesOrder": <Array<String>>, // array of notes
  "metadata": {
    "title": <String>, // title of the section
    "description": <String>, // description/abstract of the section
    "authors": <Array>, // authors specific to the section
    "level": <Number> // level of hierarchy of the section
  }
}
```

## Anatomy of a note

```js
{
  "id": <String>, // self identification
  "editorState": <Object>, // draft-js raw state
  "order": <Number> // order of the note
}
```

## Anatomy of a resource

```js
{
  "data": <Object>, // related data
  "metadata": <Object>, // 
}
```

## Anatomy of a contextualization

```js
{
  "id": <String>, // self identification
  "resourceId": <String>, // resource identifier
  "contextualizerId": <String>, // contextualizer identifier
  "sectionId": <String> // section in which the contextualization is
}
```

## Anatomy of a contextualizer

```js
{
  "id": <String>, // self identification
  "type": <String> // type of expected contextualization
}
```

## Anatomy of settings

```js
{
  "template": <String>, // the template to use
  "options": <Object>, // template dependent options
  "citationStyle": <String>, // serialized csl citation style data
  "citationLocale": <String>, // serialized xml locale data
  "css": <String> // the custom css code to use
}
```



