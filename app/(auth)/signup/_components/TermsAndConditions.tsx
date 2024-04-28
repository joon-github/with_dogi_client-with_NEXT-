import AgreementCheckbox from "@/app/_shared/components/molecule/AgreementCheckbox";
import ModalTriggerButton from "../../../_shared/components/molecule/ModalTriggerButton";
import { LuChevronRight } from "react-icons/lu";
export default function TermsAndConditions() {
  return (
    <label>
      <strong>모두 확인하였으며 동의합니다.</strong>
      <p>
        전체 동의에는 필수 및 선택 정보에 대한 동의가 포함되어 있으며,
        개별적으로 동의를 선택 하실 수 있습니다. 선택 항목에 대한 동의를
        거부하시는 경우에도 서비스 이용이 가능합니다.
      </p>
      <div>
        <AgreementCheckbox label="[필수] 만 14세 이상입니다." />
        <AgreementCheckbox label="[필수] with dogi 이용약관 동의">
          <ModalTriggerButton title="with dogi 약관 동의" contents="test">
            <LuChevronRight />
          </ModalTriggerButton>
        </AgreementCheckbox>
        <AgreementCheckbox label="[필수] 개인정보 수집 및 이용 동의" />
        <AgreementCheckbox label="[필수] 개인정보 제3자 제공 동의" />
      </div>
    </label>
  );
}
