$(document).ready(function() {
    // Initialize tasks from localStorage
    function initializeTasks() {
      // Retrieve tasks from localStorage and populate the board
    }
  
    // Save tasks to localStorage
    function saveTasks() {
      // Save the current tasks to localStorage
    }
  
    // Add a new task
    $('#task-form').on('submit', function(event) {
      event.preventDefault();
      // Get task details
      const title = $('#task-title').val().trim();
      const description = $('#task-desc').val().trim();
      const deadline = $('#task-date').val();
      
      if (title && description && deadline) {
        // Create task element and append to "To Do" column
        const task = $('<div>').addClass('task card my-2').attr('data-deadline', deadline);
        task.append($('<h5>').addClass('card-title').text(title));
        task.append($('<p>').addClass('card-text').text(description));
        task.append($('<p>').addClass('card-text').text('Due: ' + deadline));
        task.append($('<button>').addClass('btn btn-danger btn-sm delete-task').text('Delete'));
        $('#todo-cards').append(task);
        
        // Clear form fields
        $('#task-form')[0].reset();
        
        // Save tasks to localStorage
        saveTasks();
        
        // Close modal
        $('#formModal').modal('hide');
      }
    });
  
    // Delete a task
    $(document).on('click', '.delete-task', function() {
      $(this).closest('.task').remove();
      saveTasks();
    });
  
    // Make tasks draggable
    $('.lane .card-body').sortable({
      connectWith: '.lane .card-body',
      receive: function(event, ui) {
        saveTasks();
      }
    }).disableSelection();
  
    // Check deadlines and apply color coding
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
  
    // Initialize the task board
    initializeTasks();
    checkDeadlines();
  });