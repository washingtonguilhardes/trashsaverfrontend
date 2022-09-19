import { NextPageContext } from 'next';
import { Session, unstable_getServerSession } from 'next-auth';
import { authOptions } from 'pages/api/auth/[...nextauth]';

export type ProtectedPageProps = Session;

export function protectedRoute(
  cb?: (context: NextPageContext, session: Session) => Promise<ProtectedPageProps>
) {
  return async (context: NextPageContext) => {
    const session = await unstable_getServerSession(
      context.req,
      context.res,
      authOptions
    );
    if (!session) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }
    if (!cb) {
      return { props: session };
    }

    const props = await cb(context, session);

    return {
      props: {
        ...session,
        ...props,
      }, // will be passed to the page component as props
    };
  };
}
