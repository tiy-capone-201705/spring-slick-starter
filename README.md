# Spring Slick Starter

This project contains a Maven project that includes both the Angular 1 and Angular 2 clients.

## To use

Change the values in `application.yml` to choose to serve which version of the Angular clients to serve.

## Angular 2 Caveats

### Developing
You need two Terminal windows:

1. One to develop in Angular 2, run `npm run serve` from `src/main/resources/angular2/ui/`
   and open your browser to [http://localhost:4200](http://localhost:4200) which will serve
   the application.
2. One to run `mvn spring-boot:run` to run the Spring application from the
   directory that has the `pom.xml` file in it.
3. Run `node index.js` inside `src/main/resources/angular2/reverse-proxy` after installing npm packages (there is a seperate node_modules inside this reverse-proxy module)

### Deploying
Run `npm run build` from `src/main/resources/angular2/ui/` to populate the `templates` and
`static` directories. Then, run `mvn spring-boot:run` from the directory with the `pom.xml`
file to make sure everything works correctly.
