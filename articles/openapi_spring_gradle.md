---
title: OpenApi, Spring and Gradle
description: blog description
publish: false
---

# How To: OpenAPI with Spring and Gradle

<div class="summary">
	<a href="articles/openapi_spring_gradle#introduction" class="header">Introduction</a>
	<a href="articles/openapi_spring_gradle#useful_information" class="header">Useful information before starting</a>
	<a href="articles/openapi_spring_gradle#openapi_cli_tool" class="header">Using the OpenApi Generator CLI tool</a>
	<a href="articles/openapi_spring_gradle#open_api_tool_setup" class="tab">Setup
	<a href="articles/openapi_spring_gradle#open_api_tool_usage" class="tab">Usage</a>
	<a href="articles/openapi_spring_gradle#open_gradle_plugin" class="header">Using the OpenApi Generator Gradle Plugin</a>
	<a href="articles/openapi_spring_gradle#open_gradle_plugin_setup" class="tab">Setup</a>
	<a href="articles/openapi_spring_gradle#open_gradle_plugin_usage" class="tab">Usage</a>
	<a href="articles/openapi_spring_gradle#conclusion" class="header">Conclusion</a>
</div>

## <a id="introduction"></a>Introduction

When it comes to API definition and code generation, the OpenApi specification is a great tool to use. Providing a definition to all relevant parties/consumers is a safe way to ensure everyone know exactly what to expect from the Api in terms of entry points, responses, etc. 

This article aims to provide a step-by-step guide for the following Spring project use-cases:

- generating code using the OpenApi CLI tool 
- generating code from within the app itself with the OpenApi Generator plugin 

You can read more about OpenApi, and its Swagger parent, here: https://app.swaggerhub.com/help/tutorials/openapi-3-tutorial

## <a id="useful_information"></a>Useful information before starting

I’ll be using the OpenAPi 3.0.0 definition file during the course of the article, as well as the Intellij IDEA Community IDE. 
You can also see the demo’s Github repository at https://github.com/GabSire-087/spring-gradle-openapi-demo. 

To visualize the Api using Swagger Editor: https://editor.swagger.io/ 
To convert a pre-existing Swagger definition: https://www.apimatic.io/transformer/

![alt text](assets/images/article_openapi/001_swagger_editor.jpg "No image available")

***

## <a id="openapi_cli_tool"></a>Using the OpenApi Generator CLI tool

### <a id="open_api_tool_setup"></a>Setup

There’s a variety of ways to install the OpenApi Cli tool, which can be found here: https://openapi-generator.tech/docs/installation/ 

Because I use Windows, I find it easiest to install it with npm, like so:

<pre class="language-bash"><code class="language-bash">
npm install @openapitools/openapi-generator-cli -g
</code></pre>

### <a id="open_api_tool_usage"></a>Usage

I then use the following command to generate the classes: 

<pre class="language-bash"><code class="language-bash">
openapi-generator generate -g spring -i C:\develop\openapi_definitions\net-gabsire087-demo-book-api-1.0.0.yml -o out
</code></pre>

where **g** is the generator name, **i** is the input definition file, and **o** is the output directory.

The files can now be found in my output directory here:

![alt text](assets/images/article_openapi/002_open_api_cli_generate.jpg "No image available")

![alt text](assets/images/article_openapi/003_open_api_generate_src.jpg "No image available")

![alt text](assets/images/article_openapi/004_open_api_g_api.jpg "No image available")

![alt text](assets/images/article_openapi/005_open_api_models.jpg "No image available")

You’ll notice that in this case, we have generated model objects, a controller, configurations, and other Api stuff. 
What I like about specifying Spring as a language is that in this case the BooksApi class, which BookApiController is derived from, is an interface, so you make sure the Controller has to implement the defined methods correctly. 

***

## <a id="open_gradle_plugin"></a>Using the OpenApi Generator Gradle Plugin

### <a id="open_gradle_plugin_setup"></a>Setup

Let's place the definition somewhere visible within the application:

![alt text](assets/images/article_openapi/007_contract_placement.jpg "No image available")

First, make sure to insert the plugin in your build.gradle.

<pre class="language-groovy"><code class="language-groovy">
plugins {
	// omissions
	id "org.openapi.generator" version "4.3.0"
}
</code></pre>

### <a id="open_gradle_plugin_usage"></a>Usage

By applying the plugin (no other instruction necessary), the task openApiGenerate should be available for you to write and customize:

<pre class="language-groovy"><code class="language-groovy">
// out-of-the-box task with openapi-genrator plugin
openApiGenerate{
	generatorName = "spring"
	inputSpec = "$projectDir/demo-book-api/net-gabsire087-demo-book-api-1.0.0.yml"
	outputDir = "$buildDir/generated/"
	apiPackage = "net.gabsire087.springgradleopenapidemo.api.v1"
	modelPackage = "net.gabsire087.springgradleopenapidemo.api.v1.model"
}
</code></pre>

If you wish to generate classes from multiple definitions, you can then add a new task by specifying the type of task from the OpenApi Gradle plugin: 

<pre class="language-groovy"><code class="language-groovy">
//second openApiGenerate task
task generateWhatever(type: org.openapitools.generator.gradle.plugin.tasks.GenerateTask){
    //parameters here
} 
</code></pre>

You can then specify in the build.gradle that upon compiling, we need to generate the OpenApi classes: 

<pre class="language-groovy"><code class="language-groovy">
compileJava.dependsOn tasks.openApiGenerate
</code></pre>

As you can gather from the outputDir paramater, I recommend to cleanly separate your generated classes from the rest of the app’s code by using the folder build (generating classes in a specified directory tend to overwrite the current directory’s content, you have been warned). 

However, because we want our application to treat the build/generated/src/main/java as a main source, we have to specify it in the Gradle sourceSets: 

<pre class="language-groovy"><code class="language-groovy">
// consider generated classes as source
sourceSets {
	main {
		java {
			srcDir "${buildDir}/generated/src/main/java"
			srcDir "${buildDir}/generated/sources/annotationProcessor/java/main"
		}
	}
}
</code></pre>

I then move the controller in my non-generated source path, for we don’t want the app to re-write our implementations each time the project builds:

![alt text](assets/images/article_openapi/008_controller_move.jpg "No image available")

Finally, it’s worth noting that if you go the Spring route, other dependencies may be needed, in my case I had to append Swagger annotations, Swagger SpringFox, and jackson-databind-nullable:

<pre class="language-groovy"><code class="language-groovy">
// depencencies for OpenAPI generated Spring code
	implementation 'io.swagger:swagger-annotations:1.6.0'
	implementation 'io.springfox:springfox-swagger2:2.9.2'
	implementation 'org.openapitools:jackson-databind-nullable:0.2.0'
</code></pre>

And voilà! Now, each time I do a gradle clean build I should be able to see that the OpenApi Generator has successfully generated the classes I needed for this demo app to work.

![alt text](assets/images/article_openapi/009_tasks_output.jpg "No image available")

![alt text](assets/images/article_openapi/010_build_classes.jpg "No image available")

## <a id="conclusion"></a>Conclusion

In conclusion, we were able to see how to generate Spring code using the OpenAPI Generator CLI tool and the OpenApi Generator Gradle tool.