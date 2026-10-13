---
layout: page
title: Projects
permalink: /projects/
---

<div markdown="0">

<h3>Current research</h3>

<div class="project-card">
  <h4>Effort, rest, and task switching</h4>
  <p class="project-meta">PhD research &middot; Poldrack Lab, Stanford &middot; with Joshua Buckholtz &amp; Russ Poldrack</p>
  <p>I designed and built online experiments that investigate how self-paced rest decisions (a potential proxy for cognitive fatigue), task switching, and performance in an effortful task interact. Using a combination of mixed effects modeling, machine learning, and time-varying hidden Markov modeling, I'm developing computational models of how task switching interacts with latent cognitive states.</p>
  <p class="project-result"><strong>Key findings:</strong> People's self-paced rest decisions are stable but do little to aid recovery (CCN 2026, extended <a href="{{ site.url }}/assets/papers/479_Self_paced_rest_decisions_.pdf" target="_blank" rel="noopener noreferrer">abstract</a>). Results also suggest that switching tasks while performing poorly may benefit later performance (CCN 2025, extended <a href="https://2025.ccneuro.org/abstract_pdf/Klevak_2025_The_effect_task_switching_cognitive_fatigue.pdf" target="_blank" rel="noopener noreferrer">abstract</a>). First-author paper in prep: <em>Task-Switching Resets Latent Performance States During Cognitive Effort.</em></p>
  <p class="tags"><span>Experiment design</span><span>Computational modeling</span><span>Behavioral data analysis</span><span>Cognitive state</span></p>
</div>

<div class="project-card">
  <h4>Controlling your own learning with AI</h4>
  <p class="project-meta">PhD research &middot; Poldrack Lab, Stanford &middot; Ongoing study series</p>
  <p>As more people learn with AI, it's important to know whether it builds skills or replaces them. I'm running a series of online behavioral studies on how well people can control their own learning when an AI assistant is available, and how AI assistance shapes learning outcomes and metacognitive judgments. For example: do people use the AI differently when they know they'll be tested without it later, and does using it change their sense of when they've learned enough?</p>
  <p class="tags"><span>Experiment design</span><span>Human-AI interaction</span><span>Learning</span><span>Metacognition</span></p>
</div>

<div class="project-card">
  <h4>How practice reshapes brain networks</h4>
  <p class="project-meta">PhD research &middot; Poldrack Lab, Stanford</p>
  <p>Using a dense-sampling fMRI dataset where 46 participants did the same cognitive control tasks across many sessions, I'm using hyperalignment to align participants' brain responses and analyze how active brain networks shift with practice, in order to identify neural signatures of practice effects. The dataset is part of a larger lab effort toward a neural taxonomy of cognitive control (OHBM 2026).</p>
  <p class="tags"><span>fMRI</span><span>Dense sampling</span><span>Hyperalignment</span><span>Network analysis</span><span>Multi-session neural data</span><span>Practice effects</span></p>
</div>

<h3>Previous work</h3>

<div class="project-card">
  <h4>Classifying fMRI data from the orbitofrontal cortex</h4>
  <p class="project-meta">Research assistant &amp; lab manager &middot; Princeton Neuroscience Institute, Niv Lab &middot; 2022&ndash;2023</p>
  <p>I built supervised learning models to classify cognitive states from high-dimensional orbitofrontal cortex fMRI data. I also managed data collection for neuroimaging experiments.</p>
  <p class="tags"><span>fMRI</span><span>Supervised ML</span><span>Data collection</span></p>
</div>

<div class="project-card">
  <h4>Evaluating CLIP on photos taken by blind and low-vision users</h4>
  <p class="project-meta">Independent research &middot; Princeton &middot; Advised by Olga Russakovsky</p>
  <p>CLIP was trained mostly on photos taken by sighted people. I tested whether it works for blind and low-vision users, using VizWiz-Captions, a dataset of real photos they took. I built a statistical evaluation pipeline to measure CLIP's accuracy, then tried to improve its accuracy by fine-tuning a neural network classifier and adding it to the pipeline.</p>
  <p class="tags"><span>Deep learning</span><span>Model evaluation</span><span>Fine-tuning</span><span>Accessibility</span></p>
</div>

<div class="project-card">
  <h4>Simulating language conventions in emerging sign language communities</h4>
  <p class="project-meta">Independent research &middot; Princeton &middot; Advised by Tom Griffiths, Bill Thompson &amp; Robert Hawkins</p>
  <p>I implemented and adapted several hierarchical Bayesian models to simulate how shared linguistic conventions emerge in new sign language communities of different population sizes.</p>
  <p class="tags"><span>Hierarchical Bayesian models</span><span>Simulation</span><span>Python</span></p>
</div>

<h3>Publications</h3>
<ul class="pub-list">
  <li><strong>Klevak, N.</strong>, Buckholtz, J. W.<sup>#</sup>, &amp; Poldrack, R. A.<sup>#</sup> Task-switching resets latent performance states during cognitive effort. <em>In preparation.</em> <small>(<sup>#</sup>co-senior authors)</small></li>
  <li>Boyce, V., Prystawski, B., &hellip; <strong>Klevak, N.</strong>, &hellip; Frank, M. C. (2025). Estimating the replicability of psychology experiments after an initial failure to replicate. <em>Collabra: Psychology.</em> <a href="https://doi.org/10.1525/collabra.125685" target="_blank" rel="noopener noreferrer">[doi]</a></li>
</ul>

<h3>Conference presentations</h3>
<ul class="pub-list">
  <li><strong>Klevak, N.</strong>, Buckholtz, J. W., &amp; Poldrack, R. A. (2026). Self-paced rest decisions: stable but ineffective for recovery. Extended abstract &amp; poster, <em>CCN 2026</em>. <strong>Selected as a spotlight.</strong>{% assign ccn26 = site.static_files | where: "path", "/assets/papers/479_Self_paced_rest_decisions_.pdf" | first %}{% if ccn26 %} <a href="{{ site.url }}/assets/papers/479_Self_paced_rest_decisions_.pdf" target="_blank" rel="noopener noreferrer">[pdf]</a>{% endif %}</li>
  <li>Bissett, P. G., &hellip; <strong>Klevak, N.</strong>, &hellip; Poldrack, R. A. (2026). Toward a neural taxonomy of cognitive control: A dense-sampling study of 46 individuals. Poster, <em>OHBM 2026</em>.</li>
  <li>Koller, W. N., &hellip; <strong>Klevak, N.</strong>, &hellip; Norman, K. A., &amp; Niv, Y. (2026). Atypical event segmentation in schizotypy. Poster, <em>SOBP 2026</em>.</li>
  <li><strong>Klevak, N.</strong>, Buckholtz, J. W., &amp; Poldrack, R. A. (2025). The effect of task switching on cognitive fatigue. Extended abstract &amp; poster, <em>CCN 2025</em>. <a href="https://2025.ccneuro.org/abstract_pdf/Klevak_2025_The_effect_task_switching_cognitive_fatigue.pdf" target="_blank" rel="noopener noreferrer">[pdf]</a></li>
  <li>Harootonian, S., Ho, M., <strong>Klevak, N.</strong>, &amp; Niv, Y. (2022). The best advice you can give. Contributed talk, <em>CCN 2022</em> (presented by Sevan Harootonian). <a href="https://doi.org/10.32470/CCN.2022.1297-0" target="_blank" rel="noopener noreferrer">[doi]</a></li>
</ul>

</div>
