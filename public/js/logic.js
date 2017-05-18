$(document).ready(()=>{

    $(document).on("click", ".verifyBtn", function() {
        var id = $(this).data('id');
        $.post('/verify/' + id, (err) => {
            console.log('route hit')
        });
    });
        $(document).on("click", ".adminBtn", function() {
        var id = $(this).data('id');
        $.post('/makeAdmin/' + id, (err) => {
            console.log('route hit')
        });
    });
        $(document).on("click", ".deleteUserBtn", function() {
        var id = $(this).data('id');
        $.post('/deleteUser/' + id, (err) => {
            console.log('route hit')
        });
    });

})