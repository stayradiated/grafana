import React, { useMemo } from 'react';

import { Button, HorizontalGroup, TextArea, Form, Checkbox } from '@grafana/ui';
import { e2e } from '@grafana/e2e';
import { SaveDashboardFormProps } from '../types';

interface SaveDashboardFormDTO {
  message: string;
  saveVariables: boolean;
  saveTimerange: boolean;
}

export const SaveDashboardForm: React.FC<SaveDashboardFormProps> = ({ dashboard, onCancel, onSuccess, onSubmit }) => {
  const hasTimeChanged = useMemo(() => dashboard.hasTimeChanged(), [dashboard]);
  const hasVariableChanged = useMemo(() => dashboard.hasVariableValuesChanged(), [dashboard]);

  return (
    <Form
      onSubmit={async (data: SaveDashboardFormDTO) => {
        const result = await onSubmit(dashboard.getSaveModelClone(data), data, dashboard);
        if (result.status === 'success') {
          if (data.saveVariables) {
            dashboard.resetOriginalVariables();
          }
          if (data.saveTimerange) {
            dashboard.resetOriginalTime();
          }
          onSuccess();
        }
      }}
    >
      {({ register, errors }) => (
        <>
          <div className="gf-form-group">
            {hasTimeChanged && (
              <Checkbox
                label="Save current time range as dashboard default"
                name="saveTimerange"
                ref={register}
                aria-label={e2e.pages.SaveDashboardModal.selectors.saveTimerange}
              />
            )}
            {hasVariableChanged && (
              <Checkbox
                label="Save current variable values as dashboard default"
                name="saveVariables"
                ref={register}
                aria-label={e2e.pages.SaveDashboardModal.selectors.saveVariables}
              />
            )}
            {(hasVariableChanged || hasTimeChanged) && <div className="gf-form-group" />}

            <TextArea name="message" ref={register} placeholder="Add a note to describe your changes..." autoFocus />
          </div>

          <HorizontalGroup>
            <Button type="submit" aria-label={e2e.pages.SaveDashboardModal.selectors.save}>
              Save
            </Button>
            <Button variant="secondary" onClick={onCancel}>
              Cancel
            </Button>
          </HorizontalGroup>
        </>
      )}
    </Form>
  );
};
