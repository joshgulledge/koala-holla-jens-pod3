console.log('js');

$(document).ready(function () {
  console.log('JQ');
  // Establish Click Listeners
  setupClickListeners();
  // load existing koalas on page load
  getKoalas();
  $(document).on('click', '.btn-transfer', onClick);
}); // end doc ready

function onTransfer(koalaId) {
  // console.log('transfer btn clicked');
  // console.log($(this).data('id'));

  $.ajax({
    method: 'PUT',
    url: `/koalas/readyForTransfer/${koalaId}`,
    data: {
      koalaId,
    },
  })
    .then((res) => {
      console.log(res);
      $('#viewKoalas').empty();
      getKoalas();
    })
    .catch((err) => console.error(err));
}

function onClick() {
  let koalaId = $(this).data('id');

  onTransfer(koalaId);
}

function setupClickListeners() {
  $('#addButton').on('click', function () {
    console.log('in addButton on click');

    let koalaToSend = {
      name: $('#nameIn').val(),
      age: $('#ageIn').val(),
      gender: $('#genderIn').val(),
      ready_for_transfer: $('#readyForTransferIn').val(),
      notes: $('#notesIn').val(),
    };
    console.log($('#readyForTransferIn').val());
    // call saveKoala with the new object
    saveKoala(koalaToSend);
  });
}

function getKoalas() {
  console.log('in getKoalas');
  // ajax call to server to get koalas
  $.ajax({
    method: 'GET',
    url: '/koalas',
  }).then(function (response) {
    console.log('GET response', response);
    for (let i = 0; i < response.length; i++) {
      $('#viewKoalas').append(`
        <tr>
          <td>${response[i].name}</td>
          <td>${response[i].age}</td>
          <td>${response[i].gender}</td>
          <td>${response[i].ready_for_transfer}</td>
          <td>${response[i].notes}</td>
          ${
            response[i].ready_for_transfer === false
              ? `<td>
                <button class="btn-transfer" data-id="${response[i].id}">
                  Ready for transfer
                </button>
              </td>`
              : `<td>ready to transfer</td>`
          }
        </tr>
      `);
    }
  });
} // end getKoalas

function saveKoala(newKoala) {
  console.log('in saveKoala', newKoala);
  // ajax call to server to get koalas
  $.ajax({
    method: 'POST',
    url: '/koalas',
    data: newKoala,
  }).then(function (response) {
    $('#viewKoalas').empty();
    $('#nameIn').val('');
    $('#ageIn').val('');
    $('#genderIn').val('');
    $('#readyForTransferIn').val('');
    $('#notesIn').val('');
    getKoalas();
  });
}
