import MainTopCard from '../../component/MainTopCard';

export default function MentorSidebar({ email}) {
  const mylinks = ["matches", "message", "profile"];
  // const name = "Welcome Back" + ' ' + firstname  + ' ' + lastname
  return (
   <MainTopCard
   links={mylinks}
   homeLink={'/mentor-dashboard'}
   type={'mentor'}
  //  title={name}
   title={email}
   subtitle={'Track and manage your mentorship progress'}
   />
  );
}
