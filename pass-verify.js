const bcrypt=require('bcrypt');


async function verifyPassword(){
  const myPassword='admin 123 .202';
  const hash='$2b$10$eNaM.Pn21bEo4B.zGqWNWOi0yYC1a3HsB4uOX2bDV0rXFJ/ZkTvSy';
  const isMatch=await bcrypt.compare(myPassword,hash);
  console.log(isMatch);
}


verifyPassword();
