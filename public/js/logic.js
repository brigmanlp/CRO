$(document).ready(()=>{

    $(document).on("click", ".verifyBtn", function() {
        var id = $(this).data('id');
        $.post('/verify/' + id, (err) => {
            console.log('route hit')
        });
    });

})