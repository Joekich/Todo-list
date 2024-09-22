import { ItemContainer, TaskText, ButtonContainer, Button } from '../TodoItem/TodoItem.Styles';

import EditIcon from '../icons/EditIcon.svg?react';
import DeleteIcon from '../icons/DeleteIcon.svg?react';

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const TodoItem = ({ task, deleteTask, openEditModal, isOverlay, theme }) => {

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: task.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: isOverlay ? 'grabbing' : 'grab',
  };

  return (
    <ItemContainer ref={setNodeRef} style={style} isDragging={isDragging} isOverlay={isOverlay} {...attributes} {...listeners}>
      <TaskText>{task.text}</TaskText>
      <ButtonContainer>
        <Button
          bgcolor="transparent"
          hovercolor={theme === 'darkTheme' ? "#b37403" : "#d68904"}
          onClick={() => openEditModal(task)}
          onPointerDown={(e) => e.stopPropagation()}
          disabled={isOverlay}>
          <EditIcon />
        </Button>
        <Button
          bgcolor="transparent"
          hovercolor={theme === 'darkTheme' ? "#a71d2a" : "#c82333"}
          onClick={() => deleteTask(task.id)}
          onPointerDown={(e) => e.stopPropagation()}
          disabled={isOverlay}>
          <DeleteIcon />
        </Button>
      </ButtonContainer>
    </ItemContainer >
  );
};

export default TodoItem;