import Image from "next/image";
import Container from "../ui/container";
import { FaXTwitter } from "react-icons/fa6";
import {
  BiLogoFacebook,
  BiLogoTwitter,
  BiLogoYoutube,
  BiLogoInstagram,
} from "react-icons/bi";
const Footer = () => {
  return (
    <footer className="md:py-8 border-t  bg-white dark:bg-[#120c12] ">
      <Container>
        <div className="py-[50px] ">
          <div className=" container mx-auto 2xl:w-[1280px]  px-4">
            <div className="flex flex-col gap-y-12  md:flex-row ">
              <div className="w-full md:w-1/2  md:flex justify-start flex-col gap-y-4  ">
                <h2 className="font-bold text-[32px] dark:text-[#c59f60]">
                  Haamerce
                </h2>
                <h3 className="mb-2 flex justify-start gap-x-2">
                  <span className="font-bold">🏠 Địa chỉ: </span>
                  <span>số 9x Đường xx, xx, xxxxxxx, xxx</span>
                </h3>
                <h3 className="mb-2 flex justify-start gap-x-2">
                  <span className="font-bold">💌 Email:</span>
                  <span>Haxxxxxx@gmail.com</span>
                </h3>
                <h3 className="mb-2 flex justify-start gap-x-2">
                  <p className="font-bold"> 📞 Tel: </p>
                  0966.xxx.xxx
                </h3>
                <div className=" flex gap-x-4">
                  <div className="">
                    <div className="w-[48px] h-[48px] flex items-center justify-center flex-col relative rounded-lg group hover:bg-[#1877f2] cursor-pointer overflow-hidden">
                      <BiLogoFacebook
                        className="group-hover:translate-y-[-100%] absolute  h-full transition-all"
                        size={48}
                      />
                      <BiLogoFacebook
                        size={48}
                        className="translate-y-[100%] group-hover:translate-y-[0] absolute bottom-0 h-full transition-all "
                      />
                    </div>
                  </div>
                  <div className="">
                    <div className="w-[48px] h-[48px] flex items-center justify-center flex-col relative rounded-lg group hover:bg-[#000000] cursor-pointer overflow-hidden">
                      <FaXTwitter
                        size={48}
                        className="group-hover:translate-y-[-100%] absolute  h-full transition-all"
                      />
                      <FaXTwitter
                        size={48}
                        className="translate-y-[100%] group-hover:translate-y-[0] absolute bottom-0 h-full transition-all "
                      />
                    </div>
                  </div>
                  <div className="">
                    <div className="w-[48px] h-[48px] flex items-center justify-center flex-col relative rounded-lg group hover:bg-[#FF0000] cursor-pointer overflow-hidden">
                      <BiLogoYoutube
                        size={48}
                        className="group-hover:translate-y-[-100%] absolute  h-full transition-all"
                      />
                      <BiLogoYoutube
                        size={48}
                        className="translate-y-[100%] group-hover:translate-y-[0] absolute bottom-0 h-full transition-all "
                      />
                    </div>
                  </div>
                  <div className="">
                    <div className="w-[48px] h-[48px] flex items-center justify-center flex-col relative rounded-lg group hover:bg-[#833AB4] cursor-pointer overflow-hidden">
                      <BiLogoInstagram
                        size={48}
                        className="group-hover:translate-y-[-100%] absolute  h-full transition-all"
                      />
                      <BiLogoInstagram
                        size={48}
                        className="translate-y-[100%] group-hover:translate-y-[0] absolute bottom-0 h-full transition-all "
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 mx-auto text-center md:text-left ">
                <h3 className="mb-2">© CDLT420CNTT </h3>

                <div className="flex items-center justify-start gap-x-2">
                  <a
                    href="/"
                    className="py-[3px] border-b-[1px] border-dotted border-[#FFFFFF40] text-[13px]"
                  >
                    Về chúng tôi
                  </a>{" "}
                  /
                  <a
                    href="/"
                    className="py-[3px] border-b-[1px] border-dotted border-[#FFFFFF40] text-[13px]"
                  >
                    Liên hệ
                  </a>{" "}
                  /
                  <a
                    href="/"
                    className="py-[3px] border-b-[1px] border-dotted border-[#FFFFFF40] text-[13px]"
                  >
                    Điều khoản sử dụng
                  </a>{" "}
                  /
                  <a
                    href="/"
                    className="py-[3px] border-b-[1px] border-dotted border-[#FFFFFF40] text-[13px]"
                  >
                    Chính sách bảo mật
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
