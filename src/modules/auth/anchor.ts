import AnchorLink, { LinkSession } from 'anchor-link';
import AnchorLinkBrowserTransport from 'anchor-link-browser-transport';
import { chainId, dapp, endpoint } from '../../lib/waxnet';
import { WalletUser } from '../../typings/acount/user';

const anchorTransport = new AnchorLinkBrowserTransport();
const anchorLink = new AnchorLink({
  transport: anchorTransport,
  verifyProofs: true,
  chains: [{ chainId: chainId, nodeUrl: endpoint }]
});

const loginWithAnchor = async (): Promise<WalletUser> => {
  let session: LinkSession | null;

  const sessionList = await anchorLink.listSessions(dapp);
  if (sessionList && sessionList.length > 0) {
    session = await anchorLink.restoreSession(dapp);
  } else {
    try {
      const sess = await anchorLink.login(dapp);
      session = sess.session;
    } catch (e) {
      throw new Error(e);
    }
  }

  if (!session) return;

  return {
    type: 'anchor',
    wallet: String(session.auth.actor),
    permission: String(session.auth.permission),
    pubKeys: []
  };
};

export { loginWithAnchor, anchorLink };
