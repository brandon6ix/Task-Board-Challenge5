$(document).ready(function() {
  function initializeTasks() {
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasks.forEach(task => {
          const taskElement = $('<div>').addClass('task card my-2').attr('data-deadline', task.deadline);
          taskElement.append($('<h5>').addClass('card-title').text(task.title));
          taskElement.append($('<p>').addClass('card-text').text(task.description));
          taskElement.append($('<p>').addClass('card-text').text('Due: ' + task.deadline));
          taskElement.append($('<button>').addClass('btn btn-danger btn-sm delete-task').text('Delete'));
          $('#' + task.status + '-cards').append(taskElement);
      });
      checkDeadlines();
  }

  function saveTasks() {
      const tasks = [];
      $('.lane').each(function() {
          const laneId = $(this).attr('id').replace('-cards', '');
          $(this).find('.task').each(function() {
              const task = {
                  title: $(this).find('.card-title').text(),
                  description: $(this).find('.card-text').first().text(),
                  deadline: $(this).attr('data-deadline'),
                  status: laneId
              };
              tasks.push(task);
          });
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  $('#task-form').on('submit', function(event) {
      event.preventDefault();

      const title = $('#task-title').val().trim();
      const description = $('#task-desc').val().trim();
      const deadline = $('#task-date').val();

      if (title && description && deadline) {
          const task = $('<div>').addClass('task card my-2').attr('data-deadline', deadline);
          task.append($('<h5>').addClass('card-title').text(title));
          task.append($('<p>').addClass('card-text').text(description));
          task.append($('<p>').addClass('card-text').text('Due: ' + deadline));
          task.append($('<button>').addClass('btn btn-danger btn-sm delete-task').text('Delete'));
          $('#todo-cards').append(task);

          $('#task-form')[0].reset();

          saveTasks();

          $('#formModal').modal('hide');
      }
  });

  $(document).on('click', '.delete-task', function() {
      $(this).closest('.task').remove();
      saveTasks();
  });

  $('.lane .card-body').sortable({
      connectWith: '.lane .card-body',
      receive: function(event, ui) {
          saveTasks();
      }
  }).disableSelection();

  function checkDeadlines() {
      const now = dayjs();
      $('.task').each(function() {
          const deadline = dayjs($(this).attr('data-deadline'));
          if (deadline.isBefore(now, 'day')) {
              $(this).addClass('bg-danger text-white');
          } else if (deadline.isBefore(now.add(1, 'week'), 'day')) {
              $(this).addClass('bg-warning');
          }
      });
  }

  initializeTasks();
  checkDeadlines();
});

