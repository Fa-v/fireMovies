$(document).ready(function() {
  $('#updateModal').on('show.bs.modal', function(e) {
    var movieId = $(e.relatedTarget).data('id');
    $(e.currentTarget)
      .find('#form')
      .attr('action', `/movies/${movieId}/update`);
  });
});
