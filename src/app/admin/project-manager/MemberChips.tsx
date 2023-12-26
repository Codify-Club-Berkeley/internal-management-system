import React from "react";
import { useAdmin } from "../adminContext";
import { MemberChip } from "./MemberChip";

const MemberChips: React.FC<{}> = () => {
  const { state, dispatch } = useAdmin();

  const handleClose = (membertoRemove: any) => {
    dispatch({ type: "REMOVE_MEMBER", payload: membertoRemove });
  };

  const handlePromote = (membertoPromote: any) => {
    dispatch({ type: "ADD_LEAD", payload: membertoPromote });
    dispatch({ type: "REMOVE_MEMBER", payload: membertoPromote });
  };

  const handleDemote = (leadtoDemote: any) => {
    dispatch({ type: "ADD_MEMBER", payload: leadtoDemote });
    dispatch({ type: "REMOVE_LEAD", payload: leadtoDemote });
  };

  return (
    <div className="flex gap-2">
      {state.leads.map((lead, index) => (
        <MemberChip
          key={index}
          name={lead.name}
          isLead={true}
          onDelete={() => handleClose(lead)}
          onAction={() => handleDemote(lead)}
        />
      ))}
      {state.members.map((member, index) => (
        <MemberChip
          key={index}
          name={member.name}
          isLead={false}
          onDelete={() => handleClose(member)}
          onAction={() => handlePromote(member)}
        />
      ))}
    </div>
  );
};

export default MemberChips;
