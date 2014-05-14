# alienlebarge's blog Pattern Lab

I'm currently moving [my blog](http://www.alienlebarge.ch) [to github](https://github.com/alienlebarge/alienlebarge.github.com). I use Pattern Lab static site generator to help me to build the Front-End.  
[You can visite it](http://alienlebarge.github.io/alienlebarge-patternlab/). **It's a work in progress**

## Ressources

- [Pattern Lab](https://github.com/pattern-lab/patternlab-php)
- [InuitCSS pre-alpha modules](https://github.com/inuitcss)


## Configuration

You have to create a `config.json` file at project root. This file provide specific configuration that are specific of the environment.

Example:

```json
{
  "jekyllfolder": "../alienlebarge.github.com/"
}
```

## How to build

1. `git clone https://github.com/alienlebarge/alienlebarge-patternlab.git`
2. `npm install`
3. `grunt -help` to see what you can do.
