import MainTopCard from '../../component/MainTopCard';

export default function MentorSidebar({  firstname, lastname }) {
  const mylinks = ["matches", "requests", "connection", "profile"];
  const name = "Welcome Back" + ' ' + firstname  + ' ' + lastname
  return (
   <MainTopCard
   links={mylinks}
   homeLink={'/mentor-dashboard'}
   type={'mentor'}
   title={name}
   subtitle={'Track and manage your mentorship progress'}
   />
  );
}
