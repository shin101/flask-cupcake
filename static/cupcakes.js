

function cupcakeHTML(cupcake){
    return `
    <li>${cupcake.flavor} | ${cupcake.size} | ${cupcake.rating}</li>
    <img src="${cupcake.image}" width="250" height="250">
    </div>`;
}


async function showCupcakes(){
    // display cupcakes
    const response = await axios.get('http://localhost:5000/api/cupcakes');
    for (let cupcakeData of response.data.cupcakes){
        let newCupcake = $(cupcakeHTML(cupcakeData));
        $('#cupcakes-list').append(newCupcake);
    }
}

$("#cupcake_form").on("submit", async function(evt){
    evt.preventDefault();

    let flavor = $("#flavor").val();
    let rating = $("#rating").val();
    let size = $("#size").val();
    let image = $("#image").val();

    const newCupcakeResponse = await axios.post('http://localhost:5000/api/cupcakes',{
        flavor, rating, size, image
    });

    console.log(newCupcakeResponse);

    let newCupcake = $(cupcakeHTML(newCupcakeResponse.data.cupcake));
    $('#cupcakes-list').append(newCupcake);
    $("#cupcake_form").trigger("reset");
});

$(showCupcakes);