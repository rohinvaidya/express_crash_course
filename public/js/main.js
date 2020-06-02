$(document).ready(function () {
    $('.deleteUser').on('click', deleteUser);
});

function deleteUser() {
    var confirmation = confirm('Are you sure?');
    if (confirmation) {
        // alert(1);
        alert($(this).data('uid'));
        // var to = '/users/delete/' + $(this).data('uid');
        alert(to);
        $.ajax({
            type: 'DELETE',
            url: '/users/delete/' + $(this).data('uid')
        }).done(function (response) {
            // response.redirect('/');
            console.log("dfzfgkg");
            alert("Success");
            window.location.replace('/');
        }).fail(function (data) {
            alert("Try again champ!");
            window.location.replace('/');
        });
    }
    else {
        console.log("Did not receive confirmation!")
        return false;
    }
}