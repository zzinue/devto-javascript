

 $('.chkd').click(function() {
    window.location.href='newPost.html';
    return false;
});



$( '.Publish' ).on( 'click', function() {

 
    let addCoverImage = $('#Add').val();
    let uploadImage = $('#Upload').val();
    let postTitle = $('#article-form-title').val();
    let postContent = $('#article_body_markdown').val();
    let objData = {
        addCoverImage,
        uploadImage,
        postTitle,
        postContent
    }
console.log(objData)
//createProduct(arrayInfo)
});