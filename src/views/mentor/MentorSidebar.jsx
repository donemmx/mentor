import MainTopCard from '../../component/MainTopCard';

export default function MentorSidebar() {
  const mylinks = ["matches", "message", "profile"];
  return (
   <MainTopCard
   links={mylinks}
   homeLink={'/mentor-dashboard'}
   type={'mentor'}
   title={'Welcome Back Judith'}
   subtitle={'Track and manage your mentorship progress'}
   />
  );
}
