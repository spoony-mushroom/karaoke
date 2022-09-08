d3.csv("dbexport.csv").then(function (data) {
    // console.log(data);
  
    var songs = data;
  
    var button = d3.select("#search");
    var clear = d3.select("#clear");
  
    var form = d3.select("#form");
    var inputElement = d3.select("#user-input");
  
    button.on("click", runEnter);
    clear.on("click", _ => inputElement.property("value", ""));
    form.on("submit", runEnter);
  
    function runEnter() {
      d3.select("tbody").html("")
      d3.selectAll("p").classed('noresults', true).html("")
      d3.event.preventDefault();
      var inputValue = inputElement.property("value").toLowerCase().trim();
  
      // console.log(inputValue.length);
      // console.log(songs);
      if (inputValue.length < 2){
        d3.select("p").classed('noresults2', true).html("<center><strong>Please try using more than 2 characters to avoid too many results!</strong>")
        inputValue = "Something to give no results"
      }
      var filteredData = songs.filter(song => song.artist.toLowerCase().trim().includes(inputValue) || song.title.toLowerCase().trim().includes(inputValue) || song.id.toLowerCase().trim().includes(inputValue));
      // console.log(filteredData.length)
      if (filteredData.length === 0 && inputValue !== "Something to give no results"){
        d3.select("p").classed('noresults', true).html("<center><strong>No results</strong>")
      }
      output = _.sortBy(filteredData, "artist");
  
      for (var i = 0; i < filteredData.length; i++) {
        // console.log(output[i]['original_title'])
        // console.log(output[i]['avg_vote'])
        // d3.select("tbody>tr>td").text(output[i]['original_title']);
        d3.select("tbody").insert("tr").html("<td>"+output[i].artist+"</td><td>"+output[i].title+"</td>") }
    };
  });  