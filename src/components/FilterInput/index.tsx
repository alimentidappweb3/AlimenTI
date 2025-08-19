import './styles.css';

interface FilterInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  userType: 'supermarket' | 'organization';
  screenType: 'donations' | 'announcements'; // New prop for screen type
}

function FilterInput({ value, onChange, userType, screenType }: FilterInputProps) {
  return (
    <select id='select-style' value={value} onChange={onChange}>
      {userType === 'supermarket' ? (
        screenType === 'donations' ? (
          <>
            <option value="all">Todas</option>
            <option value="open">Abertas</option>
            <option value="closed">Fechadas</option>
          </>
        ) : (
          <>
            <option value="all">Todos</option>
            <option value="donated">Mais recente</option>
            <option value="not-donated">Antigo</option>
          </>
        )
      ) : (
        userType === 'organization' ? (
          <>
            <option value="all">Todas</option>
            <option value="subscribed">Inscritas</option>
            <option value="donated">Doadas</option>
          </>
        ) : (
          <>
            <option value="all">Todas</option>
            <option value="received">Recebido</option>
            <option value="not-received">Não Recebido</option>
          </>
        )
      )}
    </select>
  );
}

export default FilterInput;
