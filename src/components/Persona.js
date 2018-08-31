import * as React from 'react';
import {
  Persona,
  PersonaSize,
} from 'office-ui-fabric-react/lib/Persona';
import { Icon } from 'office-ui-fabric-react/lib/Icon';

export class User extends React.Component {
  render() {
    const examplePersona = {
        imageUrl: this.props.avatarURL,
        text: this.props.name,
      };

    return (
      <div className="ms-PersonaExample">
        <Persona
          {...examplePersona}
          size={PersonaSize.size64}
          onRenderSecondaryText={this._onRenderSecondaryText}
        />
      </div>
    );
  }

   _onRenderSecondaryText = props => {
    return (
      <div>
        <Icon iconName={'Suitcase'} className={'ms-JobIconExample'} />
        {props.secondaryText}
      </div>
    );
  };
}

export default User;