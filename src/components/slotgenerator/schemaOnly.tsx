import { Switch } from '@headlessui/react';
import { useSlotGenerator } from './provider';

const SchemaOnlySlot = () => {
  const {
    state: { schema_only },
    dispatch
  } = useSlotGenerator<'schema_only'>();

  return (
    <Switch.Group>
      <div className="flex flex-col items-center ml-4 w-32">
        <Switch.Label className="text-white text-sm mb-2">Schema Only</Switch.Label>
        <Switch
          checked={schema_only}
          onChange={() => dispatch({ type: 'set', key: 'schema_only', value: !schema_only })}
          className={`${
            schema_only ? 'bg-deep-champagne' : 'bg-gray-200'
          } relative inline-flex items-center h-8 rounded-full w-16`}
        >
          <span className="sr-only">Schema Only</span>
          <span
            className={`${
              schema_only ? 'translate-x-10' : 'translate-x-2'
            } inline-block w-4 h-4 transform bg-white rounded-full`}
          />
        </Switch>
      </div>
    </Switch.Group>
  );
};

export default SchemaOnlySlot;
