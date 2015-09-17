var FakeJson = require('fake-json');
var fs = require('fs');

// http://json-schema.org/latest/json-schema-validation.html
var schema = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      'url': {
        type: 'string',
        format: 'uri'
      },
      'title': {
        type: 'string',
        maxLength: 30,
      },
      'text': {
        type: 'array',
        items: {
          type: 'string',
          minLength: 200,
          maxLength: 300
        },
        minItems: 1,
        maxItems: 3
      },
      comments: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            author: {
              type: 'string',
              maxLength: 20
            },
            email: {
              type: 'string',
              format: 'email'
            },
            createdOn: {
              type: 'string',
              format: 'date-time'
            },
            comment: {
              type: 'string',
              minLength: 20,
              maxLength: 80
            },
            replies: {
              type: 'array',
              items: {
                type: 'number'
              },
              minItems: 1,
              maxItems: 3
            }
          }
        },
        minItems: 1,
        maxItems: 3
      },
      tags: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              minLength: 6,
              maxLength: 14
            },
            keywords: {
              type: 'array',
              items: {
                type: 'string',
                minLength: 6,
                maxLength: 14
              },
              minItems: 1,
              maxItems: 3
            }
          }
        },
        minItems: 1,
        maxItems: 3
      }
    }
  },
  minItems: 2,
  maxItems: 3
};

var generator = new FakeJson(schema);
var fakeData = generator.generate();
fakeData.forEach(function(item) {
  item.text = '<p>' + item.text.join('</p>\n<p>') + '</p>';
});
fs.writeFileSync('fake-data.json', JSON.stringify(fakeData));
