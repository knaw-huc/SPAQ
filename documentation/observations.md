# Observations  

In JINJA2

        let phrases = {{ dictOfWords|tojson }};

In Flask

becomes:
      let phrases = [{"id": 1, "phrase": "koud"}, {"id": 2, "phrase": "warm"}, {"id": 3, "phrase": "kil"}];

And is converted by LimeSurvey at the importing stage.

But seemingly:
      let phrases = [{ "id": 1, "phrase": "koud" }, { "id": 2, "phrase": "warm" }, { "id": 3, "phrase": "kil" }]; 


With spaces between object brackets { and the key, gives no problem. Fragile...

