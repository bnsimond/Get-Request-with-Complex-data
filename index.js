
const apiKey = "ohLjdxZW7g8n4P27hzyGjqf8WnQWAGMI6iGEkS20";
const searchURL = "https://developer.nps.gov/api/v1/parks";

function formatQueryParams(params){
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
    }

function getParks (query, limit=10) {
  const params = {
    api_key: apiKey,
    q: query,
    part: 'snippet',
    limit
  };
  const queryString = formatQueryParams (params)
  const url = searchURL +'?'+ queryString;

    fetch(url)
    .then(response => {
        if (response.ok) {
        return response.json ();
        }
        $('#js-error-message').text(`Something went wrong.`);
        throw new Error(response.statusText);
      })
      .then(responseJson => displayResults(responseJson))
      .catch(err => {
        $('#js-error-message').text(`Something went wrong: ${err.message}`);
      });
  }

function displayResults (responseJson) {
  console.log(responseJson);
  $('#results-list').empty();
  for (let i = 0; i < responseJson.data.length; i++) {
    $('#results-list').append (
      `<li><h3>${responseJson.data[i].fullName}</h3>
      <p> ${responseJson.data[i].description}</p>
      <p> <a href = "${responseJson.data[i].url}" target="_blank"> Click here to visit the website </a>
      <li>`
    )};
  };


function submitListener () {
    $("form").submit(e => {
        e.preventDefault();
        $('#results-list').html("<li><img src='loadinggif.gif'></li>")
        const stateInput = $("#state-search").val();
        const parksRequested = $("#amountRequested").val() || 5;
        console.log(stateInput, parksRequested)
        getParks (stateInput, parksRequested)
        $('.parksFound').show();
    });
}

$(submitListener)