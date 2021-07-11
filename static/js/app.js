
function dropDown() {
  d3.json('samples.json').then((data) => {
    var sampleEntries = Object.values(data.samples);
    var sampleIds = sampleEntries.map(object => object.id);
    sampleIds.forEach((id) => {
      d3.select('#selDataset')
      .append("option")
      .text(id)
      .property("value", id);
    });
  })
}
dropDown();

function optionChanged(a) {
  barChart(a);
  bubbleChart(a);
  metaData(a);
  guageChart(a);
};

function barChart(a) {
  d3.json("samples.json").then((data) => {

    var samples = data.samples.filter(function(sample){
      return sample.id === a;
    })
    
    var ylabels = samples[0].otu_ids.reverse().map(object => `OTU ${object}`);

    var trace = {
      x: samples[0].sample_values.slice(0,10).reverse(),
      y: ylabels,
      text: samples[0].otu_labels.slice(0,10).reverse(),
      type: "bar",
      orientation: "h",
      marker: {color: samples[0].otu_ids.map(object => `rgb(${object/10}, 144, 14)`)}
    };
  
    var data = [trace];
  
    Plotly.newPlot("bar", data);
  });
}

function bubbleChart(a) {
  d3.json("samples.json").then((data) => {
    var samples = data.samples.filter(function(sample){
      return sample.id === a;
    });

    var trace1 = {
      x: samples[0].otu_ids,
      y: samples[0].sample_values,
      text: samples[0].otu_labels,
      mode: "markers",
      marker: {size: samples[0].sample_values,
      color: samples[0].otu_ids.map(object => `rgb(${object/10}, 144, 14)`)}
    };

    data = [trace1];

    Plotly.newPlot("bubble", data);
  });
}

function metaData(a) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata.filter(function(meta) {
      return meta.id.toString() === a;
  });

  var dataList = d3.select("#metadata")

  dataList.selectAll("p")
  .remove();

  Object.entries(metadata[0]).forEach(([key, value]) => {
      dataList.append("p")
      .html(function(d)   {
      return `${key.toUpperCase()}: ${value}`;
    });
  });
});   
}

function guageChart(a) {
  d3.json("samples.json").then((data) => {
    console.log(data);
    var metadata = data.metadata.filter(function(meta) {
      return meta.id.toString() === a;
    });
    
    var data = [
      {
        domain: { x: [0, 1], y: [0, 1] },
        value: metadata[0].wfreq,
        title: { text: "Belly Button Washing Frequency<br><span style='font-size:0.8em;color:gray'>Scrubs per Week</span>"},
        type: "indicator",
        mode: "gauge+number"
      }
    ];
    
    var layout = { width: 400, height: 400, margin: { t: 0, b: 0 } };

    Plotly.newPlot('guage', data, layout);
  })
}