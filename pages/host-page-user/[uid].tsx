import React from 'react';
import dynamic from 'next/dynamic';

const UserDetails = dynamic(() => import('exampleRemote/User'), { ssr: true })
const UserDetailsPage = (props: JSX.IntrinsicAttributes) => {
  return <UserDetails {...props} />;
};

export const getServerSideProps = async (context: unknown) => {
  const remotePage = await import('exampleRemote/User');
  return remotePage.getServerSideProps ? remotePage.getServerSideProps(context) : {};
}

export default UserDetailsPage;
