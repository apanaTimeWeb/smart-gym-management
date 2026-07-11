import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { DUMMY_FEATURE_FLAGS, DUMMY_RELEASE_NOTES } from '../../superadmin.constants';
import { CreateFeatureFlagDto } from '../dto/create-feature-flag.dto';
import { UpdateFeatureFlagDto } from '../dto/update-feature-flag.dto';
import { CreateReleaseNoteDto } from '../dto/create-release-note.dto';
import { UpdateReleaseNoteDto } from '../dto/update-release-note.dto';

@Injectable()
export class FeaturesService {
  private readonly logger = new Logger(FeaturesService.name);

  /**
   * Returns both FeatureFlags and ReleaseNotes in a single response.
   * The frontend /superadmin/features page consumes both via the { flags, notes } shape.
   */
  findAll() {
    this.logger.log('Fetching all feature flags and release notes');
    return {
      success: true,
      message: 'Feature flags and release notes fetched successfully',
      data: {
        flags: DUMMY_FEATURE_FLAGS,
        notes: DUMMY_RELEASE_NOTES,
      },
      meta: {
        totalFlags: DUMMY_FEATURE_FLAGS.length,
        totalNotes: DUMMY_RELEASE_NOTES.length,
      },
    };
  }

  // --- Feature Flag Operations ---

  createFlag(createDto: CreateFeatureFlagDto) {
    this.logger.log(`Creating feature flag: ${createDto.name}`);
    return {
      success: true,
      message: 'Feature flag created successfully',
      data: {
        id: `ff-${Date.now()}`,
        ...createDto,
        isGlobalEnabled: createDto.isGlobalEnabled ?? false,
        enabledTenantIds: createDto.enabledTenantIds ?? [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    };
  }

  findOneFlag(id: string) {
    const flag = DUMMY_FEATURE_FLAGS.find((f) => f.id === id);
    if (!flag) {
      throw new NotFoundException(`Feature flag with ID "${id}" not found`);
    }
    return { success: true, message: 'Feature flag fetched successfully', data: flag };
  }

  updateFlag(id: string, updateDto: UpdateFeatureFlagDto) {
    const flag = DUMMY_FEATURE_FLAGS.find((f) => f.id === id);
    if (!flag) {
      throw new NotFoundException(`Feature flag with ID "${id}" not found`);
    }
    this.logger.log(`Updating feature flag: ${id}`);
    return {
      success: true,
      message: 'Feature flag updated successfully',
      data: { ...flag, ...updateDto, updatedAt: new Date().toISOString() },
    };
  }

  toggleFlag(id: string) {
    const flag = DUMMY_FEATURE_FLAGS.find((f) => f.id === id);
    if (!flag) {
      throw new NotFoundException(`Feature flag with ID "${id}" not found`);
    }
    const newValue = !flag.isGlobalEnabled;
    this.logger.log(`Toggling feature flag: ${id} to ${newValue}`);
    return {
      success: true,
      message: `Feature flag globally ${newValue ? 'enabled' : 'disabled'}`,
      data: { ...flag, isGlobalEnabled: newValue, updatedAt: new Date().toISOString() },
    };
  }

  removeFlag(id: string) {
    const flag = DUMMY_FEATURE_FLAGS.find((f) => f.id === id);
    if (!flag) {
      throw new NotFoundException(`Feature flag with ID "${id}" not found`);
    }
    this.logger.log(`Soft-deleting feature flag: ${id}`);
    return {
      success: true,
      message: 'Feature flag removed successfully',
      data: { id, isDeleted: true, deletedAt: new Date().toISOString() },
    };
  }

  // --- Release Note Operations ---

  createNote(createDto: CreateReleaseNoteDto) {
    this.logger.log(`Creating release note: ${createDto.version}`);
    return {
      success: true,
      message: 'Release note created successfully',
      data: {
        id: `rn-${Date.now()}`,
        ...createDto,
        isPublished: createDto.isPublished ?? false,
        date: createDto.date ?? null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    };
  }

  findOneNote(id: string) {
    const note = DUMMY_RELEASE_NOTES.find((n) => n.id === id);
    if (!note) {
      throw new NotFoundException(`Release note with ID "${id}" not found`);
    }
    return { success: true, message: 'Release note fetched successfully', data: note };
  }

  updateNote(id: string, updateDto: UpdateReleaseNoteDto) {
    const note = DUMMY_RELEASE_NOTES.find((n) => n.id === id);
    if (!note) {
      throw new NotFoundException(`Release note with ID "${id}" not found`);
    }
    this.logger.log(`Updating release note: ${id}`);
    return {
      success: true,
      message: 'Release note updated successfully',
      data: { ...note, ...updateDto, updatedAt: new Date().toISOString() },
    };
  }

  removeNote(id: string) {
    const note = DUMMY_RELEASE_NOTES.find((n) => n.id === id);
    if (!note) {
      throw new NotFoundException(`Release note with ID "${id}" not found`);
    }
    this.logger.log(`Soft-deleting release note: ${id}`);
    return {
      success: true,
      message: 'Release note removed successfully',
      data: { id, isDeleted: true, deletedAt: new Date().toISOString() },
    };
  }
}
