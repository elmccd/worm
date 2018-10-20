# Cache warmer

Node.js app acting as a proxy requesting given resources from its
current network.

Can be used to generate synthetic traffic for warming up cache or simulate
traffic from given location.

## API

### `[POST] /ping`

Post payload example:
```
{
	"urls": [
	    "https://google.com"
	]
}
```

Advanced example:
```
{
	"urls": [
	    "https://google.com",
	    "https://google.com"
	],
	"priority": true,
	"method": "HEAD",
	"headers": {
		"X-Sth": "true"
	}
}
```

#### Fields

##### `Array<string> urls` (required)

Array of urls to be requested. All urls will be placed at the of the queue.

##### `Bool priority` _Default: false_

Set urls as priority and put them in front of the queue.

##### `String method` _Default: "GET"_

Change request method to any valid HTTP value.

##### `Object headers` _Default: "{}"_

Provide additional headers to be included for all urls in current request.

#### Response

```javascript
{
    "status": "ok",
    "queued": Integer // number of elements in queue
}
```

#### Debugging

By default response is returned immediately before completing url requests.

If you want to debug `/ping` endpoint provide only one url in `urls` and
append `?debug` parameter to the `/ping?debug`.

Debug information will be provided both in console and in the response.


### `[GET] /`

Display information about currently process requests and queue size.

### `[GET] /healthcheck`

If not 200 we have a problem.

## Global config

`config/config.json` contains global configuration including:

##### `concurrency: Integer`

How many requests can be send at one time.

##### `default: {method, headers}`

Default values for the `/ping` API fields

## Running

`npm install`

`npm start`

## Deploying with AWS Beanstalk

Install Beanstalk CLI [https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3.html](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3.html)

Create application with `eb init` and create environment with `eb create` command.

You can find some examples in `/infra` folder.

After successful deployment application will run under
`http://[app-name].[aws-region].elasticbeanstalk.com/`
