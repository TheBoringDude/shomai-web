import { useWaxUser } from '@cryptopuppie/next-waxauth';
import { Switch } from '@headlessui/react';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-toastify';
import { useCollection } from '../../../lib/collections/colprovider';
import { dapp } from '../../../lib/waxnet';
import { useBlendConfig } from './provider';

const BlendConfigDates = () => {
  const { user } = useWaxUser();
  const { collection } = useCollection();
  const { config, blenderid } = useBlendConfig();

  const [startdate, setStartDate] = useState<Date | null>(
    config && config?.startdate !== -1 ? new Date(config.startdate * 1000) : new Date()
  );
  const [enddate, setEndDate] = useState<Date | null>(
    config && config?.enddate !== -1 ? new Date(config.enddate * 1000) : new Date()
  );

  const [enableStart, setEnableStart] = useState(config ? config.startdate !== -1 : false);
  const [enableEnd, setEnableEnd] = useState(config ? config.enddate !== -1 : false);

  const update = async () => {
    if (!user) return;
    if (!startdate || !enddate) return;

    const now = Math.floor(new Date().getTime() / 1000);

    let _startdate = Math.floor(startdate.getTime() / 1000);
    let _enddate = Math.floor(enddate.getTime() / 1000);

    if (!_startdate || !_enddate) return;

    if (now > _startdate) {
      // TODO: show error in here
      return;
    }
    if (now > _enddate) {
      // TODO: show error in here

      return;
    }

    if (_startdate > _enddate) {
      // TODO: show error in here

      return;
    }

    _startdate = enableStart ? _startdate : -1;
    _enddate = enableEnd ? _enddate : -1;

    if (config != null) {
      const { startdate: istartdate, enddate: ienddate } = config;

      if (_startdate === istartdate && _enddate === ienddate) {
        toast.info("Blend config's dates is similar.");
        return;
      }
    }

    try {
      await user
        .transact(
          [
            {
              account: dapp,
              name: 'setdates',
              authorization: [
                {
                  actor: user.wallet,
                  permission: user.permission ?? 'active'
                }
              ],
              data: {
                author: user.wallet,
                blenderid,
                scope: collection,
                startdate: _startdate,
                enddate: _enddate
              }
            }
          ],
          {
            blocksBehind: 3,
            expireSeconds: 1200
          }
        )
        .then((r) => {
          console.log(r);

          toast.success('Successfully updated config dates.');
        });
    } catch (e) {
      console.error(e);

      toast.error(String(e));
    }
  };

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
            disabled={!enableStart}
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
            disabled={!enableEnd}
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
          onClick={update}
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
