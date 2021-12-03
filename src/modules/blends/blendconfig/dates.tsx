import { Switch } from '@headlessui/react';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const BlendConfigDates = () => {
  const [startdate, setStartDate] = useState<Date | null>(new Date());
  const [enddate, setEndDate] = useState<Date | null>(new Date());
  const [enableStart, setEnableStart] = useState(false);
  const [enableEnd, setEnableEnd] = useState(false);

  return (
    <div className="my-2">
      <h4 className="text-lg uppercase underline text-sage font-bold">Dates</h4>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-11/12 mt-4 mx-auto">
        <div className="my-1 md:my-0">
          <div className="flex items-center justify-between mb-1">
            <p className="text-gray-200">Start Date</p>
            <Switch
              checked={enableStart}
              onChange={setEnableStart}
              className={`${
                enableStart ? 'bg-deep-champagne' : 'bg-gray-200'
              } relative inline-flex items-center h-6 rounded-full w-11`}
            >
              <span className="sr-only">Enable start date</span>
              <span
                className={`${
                  enableStart ? 'translate-x-6' : 'translate-x-1'
                } inline-block w-4 h-4 transform bg-white rounded-full`}
              />
            </Switch>
          </div>
          <DatePicker
            selected={startdate}
            onChange={(date) => setStartDate(date as Date)}
            showTimeInput
            timeInputLabel="Time:"
            dateFormat="MM/dd/yyyy h:mm aa"
            className="py-2 px-4 rounded-lg w-full"
          />
        </div>

        <div className="my-1 md:my-0">
          <div className="flex items-center justify-between mb-1">
            <p className="text-gray-200">End Date</p>
            <Switch
              checked={enableEnd}
              onChange={setEnableEnd}
              className={`${
                enableEnd ? 'bg-deep-champagne' : 'bg-gray-200'
              } relative inline-flex items-center h-6 rounded-full w-11`}
            >
              <span className="sr-only">Enable end date</span>
              <span
                className={`${
                  enableEnd ? 'translate-x-6' : 'translate-x-1'
                } inline-block w-4 h-4 transform bg-white rounded-full`}
              />
            </Switch>
          </div>
          <DatePicker
            selected={enddate}
            onChange={(date) => setEndDate(date as Date)}
            showTimeInput
            timeInputLabel="Time:"
            dateFormat="MM/dd/yyyy h:mm aa"
            className="py-2 px-4 rounded-lg w-full"
          />
        </div>
      </div>

      <div className="text-right mt-2">
        <button
          type="button"
          className="py-2 px-6 rounded-lg bg-sage hover:bg-deep-champagne text-sm text-gunmetal"
        >
          Update Dates
        </button>
      </div>
    </div>
  );
};

export default BlendConfigDates;
