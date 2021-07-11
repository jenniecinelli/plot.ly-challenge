
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

  var metadataList = d3.select("#metadata")

  metadataList.selectAll("p")
  .remove();

  Object.entries(metadata[0]).forEach(([key, value]) => {
      metadataList.append("p")
      .html(function(d)   {
      return `${key.toUpperCase()}: ${value}`;
    });
  });
});   
}
