import React from 'react';
import { shallow, mount, render } from 'enzyme';
import {List} from 'immutable';
import {Workspace} from '../../../src/client/components/Workspace';

describe("Workspace", () => {
  it("renders entries with vote counts or zero", () => {
    const wrapper = mount(
      <Workspace
        columns={List.of('Category', 'Grade')}
        dimensions={List.of(0)}
        measures={List.of(1)}
      />
    );
    expect(wrapper.contains(<li className="measure">Grade</li>)).to.equal(true);
    expect(wrapper.contains(<li className="dimension">Category</li>)).to.equal(true);
  });
});
