# limber-responsive-tabs
<p><strong>Limber creates dynamic and intuitive tabs from existing HTML markup that will work on all display sizes. Very simple HTML markup, and multiple color schemes.</strong></p>
<p><a href="http://www.concordia.edu/tabs" target="_blank">See these tabs on concordia.edu!</a></p>
<p><a href="http://caitlinmarkert.com/projects/limber-responsive-tabs/examples.html" target="_blank">See more examples.</a></p>
## what makes it awesome?
### it has two modes
<p>These tabs are responsive. Once the list of tab titles is so long that it overflows to another line, the tabs will transform into an accordion-style layout.</p>
<p>The tabs object is in <strong>max</strong> mode when it has the classic tabs look, and in <strong>mini</strong> mode when it looks like a collapsible accordion.</p>
### simple HTML markup
<p>All of the jQuery and CSS code is written for you. And this is all the HTML markup you have to write for each tabs object:</p>
<pre>
&#60;ANY-ELEMENT class="limber-tabs"&#62;
	&#60;div class="limber-tab"&#62;
		&#60;div class="limber-title"&#62;TITLE HERE&#60;/div&#62;
		// tab contents here
	&#60;/div&#62;
&#60;/ANY-ELEMENT&#62;
</pre>
<p>You can have multiple tab objects on the same page because each object is given its own unique ID. You can also give a tabs object an ID by adding it to the <code>.limber-tabs</code> element.</p>
### color schemes!
<p>The default color scheme is gray and purple because these tabs were designed for the <a href="http://www.concordia.edu/" target="_blank">Concordia University Texas</a> site.</p>
<p>The other options include:</p>
<ul>
<li><code>jetblack</code><br />black background, white text, gray accents</li>
<li><code>mocha</code><br />dark brown background, white text, pink accents</li>
<li><code>lime</code><br />white background, dark lime text, lime accents</li>
<li><code>cloudysky</code><br />white background, blue text, light blue accents</li>
</ul>
<p>To change the color scheme, add the name among the classes on the <code>.limber-tabs</code> object like this: <code>class="limber-tabs lime"</code></p>
## setting it up
<p>In your <code>&#60;head&#62;</code>, add the following:</p>
<ul>
<li>script link to jQuery library</li>
<li>link to your downloaded limber.css file</li>
<li>script link to your downloaded limber.js file</li>
</ul>
