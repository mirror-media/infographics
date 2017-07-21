# Structure



## Level 1

| Key             | Type       | Description                              |
| --------------- | ---------- | ---------------------------------------- |
| qid             | string     |                                          |
| title           | string     |                                          |
| subtitle        | string     |                                          |
| type            | string     | "quiz" or "qa"                           |
| status          | string     | "active" or "inactive"                   |
| **description*  | *string*   |                                          |
| image           | object     | The cover of this quiz. **Refer to image structure of level 2 as below.** |
| questions       | array      | **Refer to questions structure of level 2 as below.** |
| results         | array      | **Refer to results structure of level 2 as below.** |
| *publish_date   | datetime   | The published time of this quiz.         |
| *created_date   | datetime   | The created time of this quiz.           |
| **updated_date* | *datetime* | *The latest updated time of this quiz.*  |
| **editor*       | *string*   | *Who create this quiz.*                  |
| **curr_report*  | *object*   | *The analysis & report at this moment.*  |



## Level 2

###**image／audio／video**

| Key      | Type   | Description |
| -------- | ------ | ----------- |
| url      | string |             |
| filetype | string |             |



###questions

Every single question object in this array should be composed as this structure.

| Key                  | Type     | Description                              |
| -------------------- | -------- | ---------------------------------------- |
| id                   | string   |                                          |
| title                | string   |                                          |
| explanation          | string   |                                          |
| options              | array    | **Refer to options structure of level 3 as below.** |
| image                | object   | The cover of this question. If the leading of this question is "image", this object should exist. **Refer to image structure of level 2.** |
| audio                | object   | The cover of this question. If the leading of this question is "audio", this object should exist. **Refer to audio structure of level 2.** |
| video                | object   | The cover of this question. If the leading of this question is "video", this object should exist. **Refer to video structure of level 2.** |
| **leading*           | *string* | *"image", "audio" or "video"*            |
| **designated_option* | *string* | *The designation answer of this question.* |



###**results**

Every single result object in this array should be composed as this structure.

| Key        | Type     | Description                              |
| ---------- | -------- | ---------------------------------------- |
| id         | string   |                                          |
| title      | string   |                                          |
| comment    | string   |                                          |
| range      | object   | **Refer to video structure of level 3.** |
| **leading* | *string* | *"image", "audio" or "video"             |
| *image     | object   | The cover of this result. If the leading of this result is "image", this object should exist.**Refer to image structure of level 2.** |
| *audio     | object   | The cover of this result. If the leading of this result is "audio", this object should exist. **Refer to audio structure of level 2.** |
| *video     | object   | The cover of this result. If the leading of this result is "video", this object should exist. **Refer to video structure of level 2.** |
| *ref       | array    |                                          |



## Level 3

### options

Every single option object in this array should be composed as this structure.

| Key        | Type     | Description                              |
| ---------- | -------- | ---------------------------------------- |
| id         | string   |                                          |
| title      | string   |                                          |
| score      | int      |                                          |
| **leading* | *string* | *"image", "audio" or "video"             |
| *image     | object   | The cover of this option. If the leading of this option is "image", this object should exist.**Refer to image structure of level 2.** |
| *audio     | object   | The cover of this option. If the leading of this option is "audio", this object should exist. **Refer to audio structure of level 2.** |
| *video     | object   | The cover of this option. If the leading of this option is "video", this object should exist. **Refer to video structure of level 2. |



### range

| Key  | Type | Description |
| ---- | ---- | ----------- |
| from | int  |             |
| to   | int  |             |



# DEMO JSON FILE

### Basic JSON File

```json
{
  qid: '',
  title: '',
  subtitle: '',
  type: '',
  status: '',
  description: '',
  image: imageObject, // refer to image object structure
  publish_date: datetime,
  created_date: datetime,
  updated_date: datetime,
  editor: '',
  questions: [
    questionObject, questionObject... // refer to question object structure
  ],
  results: [
    resultObject, resultObject...// refer to result object structure
  ]
}
```



### image／audio／video object

```json
{
  ...
  image: {
    url: '',
  	filetype: ''
  }
  ...
}
```



### question object

```json
{
  ...
  questions: [
    {
      id: '',
      title: '',
      explanation: '',
      options: [
        optionObject, optionObject, ...
      ],
      leading: '',
      designated_option: '',
      image: imageObject, // refer to image object structure
      audio: audioObject, // refer to image object structure
      video: videoObject // refer to image object structure
    },
	{...},
	{...}
  ]
  ...
}
```



### option object

```json
{
  ...
  questions: [
    {
      ...
      options: [
        {
          id: '',
          title: '',
          score: '',
          leading: '',
          image: imageObject, // refer to image object structure
          audio: audioObject, // refer to image object structure
          video: videoObject // refer to image object structure          
        },
        {...},
        {...}
      ]
      ...
    },
    {...},
    {...}
  ]
  ...
}
```



### result object

```json
{
  ...
  results: [
    {
      id: '',
      title: '',
      comment: '',
      range: rangeObject,
      leading: '',
      image: imageObject, // refer to image object structure
      audio: audioObject, // refer to image object structure
      video: videoObject, // refer to image object structure        
      ref: [...]
    },
    {...},
    {...}
  ],
  ...
}
```



### range object

```json
{
  ...
  results: [
    {
      ...
      range: {
        from: 0,
        to: 10
      },
      ...
    }
    {...},
    {...}
  ],
  ...
}
```
