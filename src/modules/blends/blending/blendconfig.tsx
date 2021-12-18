// TODO: this component could be improved better for sure

import { useWaxUser } from '@cryptopuppie/next-waxauth';
import { useEffect } from 'react';
import Countdown from 'react-countdown';
import EmptyComponent from '../../../components/empty-component';
import { useBlending } from './blending-provider';

const BlendConfigInfo = () => {
  const { user } = useWaxUser();

  // const [showlimit, setShowlimit] = useState(false);
  // const [showcd, setShowcd] = useState(false);
  const { config, setDisabled, stats, userstats } = useBlending();

  const checkConfig = () => {
    if (!config) return;
    if (!user) return;

    if (config.startdate !== -1) {
      if (Math.floor(Date.now() / 1000) < config.startdate) {
        setDisabled(true);
        return;
      }
    }

    if (config.enddate !== -1) {
      if (Math.floor(Date.now() / 1000) > config.enddate) {
        setDisabled(true);
        return;
      }
    }

    if (config.enable_whitelists === 1) {
      if (!config.whitelists.includes(user?.wallet ?? '')) {
        setDisabled(true);
        return;
      }
    }

    if (stats) {
      if (config.maxuse !== -1 && config.maxuse <= stats.total_uses) {
        setDisabled(true);
        return;
      }
    }

    if (userstats) {
      if (config.maxuseruse !== -1 && config.maxuseruse <= userstats.uses) {
        setDisabled(true);
        return;
      }

      if (config.maxusercooldown !== -1) {
        if (Date.now() < (userstats.last_used + (config?.maxusercooldown ?? 0)) * 1000) {
          setDisabled(true);
          return;
        }
      }
    }

    setDisabled(false);
  };

  useEffect(() => {
    // TODO: use the function above to avoid repetitive algo

    if (!config) return;
    if (!user) return;

    if (config.startdate !== -1) {
      if (Math.floor(Date.now() / 1000) < config.startdate) {
        setDisabled(true);
        return;
      }
    }

    if (config.enddate !== -1) {
      if (Math.floor(Date.now() / 1000) > config.enddate) {
        setDisabled(true);
        return;
      }
    }

    if (config.enable_whitelists === 1) {
      if (!config.whitelists.includes(user?.wallet ?? '')) {
        setDisabled(true);
        return;
      }
    }

    if (stats) {
      if (config.maxuse !== -1 && config.maxuse <= stats.total_uses) {
        setDisabled(true);
        return;
      }
    }

    if (userstats) {
      if (config.maxuseruse !== -1 && config.maxuseruse <= userstats.uses) {
        setDisabled(true);
        return;
      }

      if (config.maxusercooldown !== -1) {
        if (Date.now() < (userstats.last_used + (config?.maxusercooldown ?? 0)) * 1000) {
          setDisabled(true);
          return;
        }
      }
    }

    setDisabled(false);
  }, [config, setDisabled, stats, user, userstats]);

  if (!config) {
    return <EmptyComponent />;
  }

  // if (config.maxuse !== -1 && stats?.total_uses === config.maxuse) {
  //   setDisabled(true);
  //   setShowlimit(true);
  // }

  return (
    <div className="w-11/12 mx-auto">
      <div className="my-2">
        <Countdown
          date={config.startdate * 1000}
          onComplete={() => {
            checkConfig();

            if (config.startdate !== -1) {
              setDisabled(false);
            }
          }}
          onStart={() => {
            checkConfig();
          }}
          renderer={({ days, hours, minutes, seconds, completed }) => {
            if (!completed) {
              return (
                <div className="text-deep-champagne inline-flex items-center">
                  <span className="font-bold tracking-wide">Unlock Time:</span>
                  <strong className="ml-2 text-3xl font-black">
                    {days} : {hours} : {minutes} : {seconds}
                  </strong>
                </div>
              );
            }

            return (
              <>
                {config.maxuse !== -1 && config.maxuse <= (stats?.total_uses ?? 0) ? (
                  <p className="text-2xl font-black text-atomic-tangerine text-center my-2">
                    Maximum Use Limit Reached
                  </p>
                ) : (
                  <EmptyComponent />
                )}

                {config.maxuseruse !== -1 && config.maxuseruse <= (userstats?.uses ?? 0) ? (
                  <p className="text-2xl font-black text-atomic-tangerine text-center my-2">
                    Maximum limit per user has been reached.
                  </p>
                ) : (
                  <EmptyComponent />
                )}

                <Countdown
                  date={config.enddate * 1000}
                  onComplete={() => {
                    checkConfig();

                    // true end if not infinite
                    if (config.enddate !== -1) {
                      setDisabled(true);
                    }
                  }}
                  onStart={() => {
                    checkConfig();
                  }}
                  renderer={({ days, hours, minutes, seconds, completed }) => {
                    if (!completed) {
                      return (
                        <div className="my-2">
                          <div className="text-deep-champagne inline-flex items-center">
                            <span className="font-bold tracking-wide">Remaining Time:</span>
                            <strong className="ml-2 text-3xl font-black">
                              {days} : {hours} : {minutes} : {seconds}
                            </strong>
                          </div>
                        </div>
                      );
                    }

                    return config.enddate !== -1 ? (
                      <p className="py-2 bg-atomic-tangerine text-gunmetal text-center rounded-lg uppercase font-bold tracking-wider">
                        Blend is over!
                      </p>
                    ) : (
                      <EmptyComponent />
                    );
                  }}
                />
              </>
            );
          }}
        />
      </div>

      {config.enable_whitelists === 1 ? (
        <p className="bg-deep-champagne text-sm py-2 text-center rounded-lg tracking-wide text-gunmetal">
          This blend is available only for whitelisted names.
        </p>
      ) : (
        <EmptyComponent />
      )}

      {userstats && config.maxusercooldown !== -1 ? (
        <Countdown
          date={new Date((userstats.last_used + config.maxusercooldown) * 1000)}
          onComplete={() => {
            checkConfig();

            // TODO: need to do something in here

            setDisabled(false);
          }}
          onStart={() => {
            checkConfig();
          }}
          renderer={({ hours, minutes, seconds, completed }) => {
            if (!completed) {
              return (
                <div className="mt-3 text-deep-champagne inline-flex items-center">
                  <span className="font-bold tracking-wide">Use Cooldown:</span>
                  <strong className="ml-2 text-3xl font-black">
                    {hours} : {minutes} : {seconds}
                  </strong>
                </div>
              );
            }

            return <EmptyComponent />;
          }}
        />
      ) : (
        <EmptyComponent />
      )}

      <div className="mt-4 flex flex-wrap items-center justify-between">
        <ul className="m-1">
          <li className="text-neutral-300">
            <span className="lowercase">Maximum use: </span>{' '}
            <strong>{config.maxuse === -1 ? <>&infin;</> : config.maxuse}</strong>
          </li>
          <li className="text-neutral-300">
            <span className="lowercase">Maximum user use: </span>{' '}
            <strong>{config.maxuseruse === -1 ? <>&infin;</> : config.maxuseruse}</strong>
          </li>
        </ul>

        {userstats ? (
          <div className="text-sage m-1">
            <span className="lowercase">current user uses: </span> <strong>{userstats.uses}</strong>
          </div>
        ) : (
          <EmptyComponent />
        )}
      </div>
    </div>
  );
};

export default BlendConfigInfo;
