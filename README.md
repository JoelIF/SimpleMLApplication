# Simple Machine Learning Demo v0.1.0

A simple machine learning application for demo purpose. It allows you to see how machine learning will understand patterns. 
Seeing de input and the output.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine.

You can clone this repository, then
If you have [node](https://nodejs.org/en/) you can install this aplication dependences with npm.
In the application folder in the console type npm install.

By default it comes with a already treined net that will try predic the next number from 0 to 10.
Try it.
Type:

```shell
node net run
```

When asked type 1 Enter, 2 Enter, 3 Enter, 4 Enter.
The expected result from this sample is 5.

In the sample folder there is a file named "default.txt" this file has a demo sample for the SimpleMLApplication.

You can edit it with any sequence of integer numbers you want to, one in each line, but I suggest you type at most 20 number at first,
since a large sample will take a large amount of time to be processed.
Once you have changed the sample file you can type.

```shell
node net train
```

to update the net.
If you want save it as a new net you can use the -o parameter.

```shell
node net train -o path-for-your-file
```

You can also use other file as sample using the parameter -i to set a path for your file.

```shell
node net train -i path-for-your-file
```

If you specify the -n  paramenter the net will be saved in the trained folder and you can run it with the command run

```shell
node net run name-of-the-net-you-created
```

You can use the command list to list all trained net availables

you can also type help to get help.

### Prerequisites

Node js 8.0 or higher
npm
robot.js

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/joelif/simplemlapplication/tags). 

## Authors

* **Joel Ferraz** - *Initial work* - [JoelIF](https://github.com/JoelIF)

## License

This project is licensed under the Apache 2.0 - see the [LICENSE.md](LICENSE.md) file for details


